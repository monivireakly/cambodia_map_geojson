<template>
  <div class="map-container">
    <div id="mapid" style="height: 800px; width: 100%; background: #e3f2fd; position: relative;"></div>
    <div v-if="selectedProvinceData" class="info-panel">
      <h3>{{ selectedProvinceData.shapeName }}</h3>
      <p><strong>ISO:</strong> {{ selectedProvinceData.shapeISO }}</p>
      <p><strong>ID:</strong> {{ selectedProvinceData.shapeID }}</p>
      <p><strong>Group:</strong> {{ selectedProvinceData.shapeGroup }}</p>
      <p><strong>Type:</strong> {{ selectedProvinceData.shapeType }}</p>
      <p><strong>Geometry Type:</strong> {{ selectedProvinceData.geometryType }}</p>
      <p><strong>Coordinates:</strong></p>
      <pre class="coords">{{ selectedProvinceData.coordinates }}</pre>
      <div v-if="selectedProvinceData.loanInfo">
        <h4>Loan Data</h4>
        <p>Total Loans: {{ selectedProvinceData.loanInfo.totalLoans }}</p>
        <p>Avg. Amount: ${{ selectedProvinceData.loanInfo.averageLoanAmount }}</p>
        <p>Default Rate: {{ (selectedProvinceData.loanInfo.defaultRate * 100).toFixed(1) }}%</p>
        <h5>Loan Types:</h5>
        <ul>
          <li v-for="(count, type) in selectedProvinceData.loanInfo.loanTypes" :key="type">
            {{ type }}: {{ count }}
          </li>
        </ul>
      </div>
    </div>
    <div class="legend" v-if="colorScale.length">
      <div class="legend-title">Total Loans</div>
      <div class="legend-scale">
        <span v-for="(color, idx) in colorScale" :key="idx" :style="{ background: color }" class="legend-color"></span>
      </div>
      <div class="legend-labels">
        <span>{{ minLoans }}</span>
        <span>{{ maxLoans }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import L, { GeoJSON, Map as LeafletMap, Layer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockLoanData, LoanInfo } from '../lib/mockLoanData';

interface SelectedProvince {
  shapeName: string;
  shapeISO: string;
  shapeID: string;
  shapeGroup: string;
  shapeType: string;
  geometryType: string;
  coordinates: string;
  loanInfo?: LoanInfo;
}

function interpolateSkyBlue(t: number): string {
  if (t <= 0) return '#e0f7fa';
  if (t >= 1) return '#01579b';
  if (t < 0.5) {
    const p = t / 0.5;
    return lerpColor('#e0f7fa', '#4fc3f7', p);
  } else {
    const p = (t - 0.5) / 0.5;
    return lerpColor('#4fc3f7', '#01579b', p);
  }
}
function lerpColor(a: string, b: string, t: number): string {
  const ah = a.replace('#', '');
  const bh = b.replace('#', '');
  const ar = parseInt(ah.substring(0,2),16), ag = parseInt(ah.substring(2,4),16), ab = parseInt(ah.substring(4,6),16);
  const br = parseInt(bh.substring(0,2),16), bg = parseInt(bh.substring(2,4),16), bb = parseInt(bh.substring(4,6),16);
  const rr = Math.round(ar + (br-ar)*t);
  const rg = Math.round(ag + (bg-ag)*t);
  const rb = Math.round(ab + (bb-ab)*t);
  return `#${rr.toString(16).padStart(2,'0')}${rg.toString(16).padStart(2,'0')}${rb.toString(16).padStart(2,'0')}`;
}

export default defineComponent({
  name: 'MapDisplay',
  setup() {
    const mapInstance: Ref<LeafletMap | null> = ref(null);
    const selectedProvinceData: Ref<SelectedProvince | null> = ref(null);
    const colorScale = ref<string[]>([]);
    const minLoans = ref(0);
    const maxLoans = ref(0);

    // Combine loan data into a lookup map for efficiency
    const loanDataMap = new Map<string, LoanInfo>();
    mockLoanData.forEach(loan => {
      loanDataMap.set(loan.provinceName, loan);
    });

    // Compute min/max for color scale
    const loanValues = mockLoanData.map(l => l.totalLoans);
    minLoans.value = Math.min(...loanValues);
    maxLoans.value = Math.max(...loanValues);
    colorScale.value = Array.from({length: 7}, (_,i) => interpolateSkyBlue(i/6));

    onMounted(async () => {
      mapInstance.value = L.map('mapid', {
        zoomControl: true,
        attributionControl: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragging: false,
        scrollWheelZoom: false,
        keyboard: false,
        tap: false,
        touchZoom: false,
      });

      // Fetch GeoJSON at runtime
      const response = await fetch('/src/assets/geoBoundaries-KHM-ADM1.geojson');
      const geojson = await response.json();

      // Add GeoJSON layer with heatmap coloring
      const geoJsonLayer: GeoJSON = L.geoJSON(geojson, {
        style: (feature) => {
          const properties = feature?.properties || {};
          const loanInfo = loanDataMap.get(properties.shapeName);
          let fillColor = '#e0f7fa';
          if (loanInfo) {
            const t = (loanInfo.totalLoans - minLoans.value) / (maxLoans.value - minLoans.value);
            fillColor = interpolateSkyBlue(t);
          } else {
            fillColor = '#e0e0e0';
          }
          return {
            fillColor,
            weight: 2,
            opacity: 1,
            color: '#fff',
            fillOpacity: 0.85,
          };
        },
        onEachFeature: (feature, layer) => {
          const properties = feature.properties || {};
          const geometry = feature.geometry || {};
          const loanInfo = loanDataMap.get(properties.shapeName);
          let tooltipContent = `<strong>${properties.shapeName}</strong><br/>`;
          if (loanInfo) {
            tooltipContent += `Total Loans: ${loanInfo.totalLoans}<br/>Avg. Amount: $${loanInfo.averageLoanAmount}`;
          } else {
            tooltipContent += 'No data';
          }
          layer.bindTooltip(tooltipContent, { direction: 'top', sticky: true, className: 'province-tooltip' });
          layer.on({
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({ weight: 3, color: '#333', fillOpacity: 1 });
              l.openTooltip();
            },
            mouseout: (e) => {
              geoJsonLayer.resetStyle(e.target as Layer);
              (e.target as any).closeTooltip();
            },
            click: (e) => {
              selectedProvinceData.value = {
                shapeName: properties.shapeName,
                shapeISO: properties.shapeISO,
                shapeID: properties.shapeID,
                shapeGroup: properties.shapeGroup,
                shapeType: properties.shapeType,
                geometryType: geometry.type,
                coordinates: JSON.stringify(geometry.coordinates, null, 2),
                loanInfo: loanInfo,
              };
            },
          });
        },
      });
      geoJsonLayer.addTo(mapInstance.value);

      // Add province name labels at centroid
      function getCentroid(coords) {
        // Handles both Polygon and MultiPolygon
        let points = [];
        if (Array.isArray(coords[0][0][0])) {
          // MultiPolygon
          coords.forEach(poly => poly[0].forEach(pt => points.push(pt)));
        } else {
          // Polygon
          coords[0].forEach(pt => points.push(pt));
        }
        let x = 0, y = 0, n = points.length;
        points.forEach(pt => { x += pt[0]; y += pt[1]; });
        return [y/n, x/n]; // [lat, lng]
      }
      geojson.features.forEach(feature => {
        const properties = feature.properties || {};
        const geometry = feature.geometry || {};
        if (!geometry.coordinates) return;
        const centroid = getCentroid(geometry.coordinates);
        if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return;
        const labelIcon = L.divIcon({
          className: 'province-label',
          html: `<span>${properties.shapeName}</span>`,
          iconSize: [100, 24],
          iconAnchor: [50, 12],
        });
        const marker = L.marker(centroid, { icon: labelIcon, interactive: false });
        marker.addTo(mapInstance.value!);
      });

      // Fit map to bounds
      try {
        const bounds = geoJsonLayer.getBounds();
        mapInstance.value.fitBounds(bounds, { padding: [20, 20] }); // Or even more
      } catch (e) {}
    });

    return {
      selectedProvinceData,
      colorScale,
      minLoans,
      maxLoans,
    };
  },
});
</script>

<style scoped>
.map-container {
  display: flex;
  background: #316b86;
  position: relative;
}
#mapid {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: #e3f2fd;
}
.info-panel {
  width: 350px;
  padding: 20px;
  border: 1px solid #eee;
  background-color: #e3f2fd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #222;
  font-size: 15px;
  word-break: break-word;
}
.info-panel h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
.info-panel p {
  margin: 10px 0;
  color: #34495e;
}
.info-panel h4, .info-panel h5 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
}
.info-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.info-panel li {
  padding: 5px 0;
  color: #34495e;
}
.coords {
  font-size: 12px;
  background: #f4f4f4;
  border-radius: 4px;
  padding: 8px;
  max-height: 120px;
  overflow: auto;
  color: #444;
}
.province-tooltip {
  background: #fff;
  color: #222;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 14px;
  padding: 6px 12px;
  border: 1px solid #ddd;
}
.legend {
  position: absolute;
  left: 30px;
  bottom: 30px;
  background: #e3f2fd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  padding: 12px 18px 10px 18px;
  z-index: 1000;
  min-width: 120px;
  font-size: 13px;
  color: #222;
  border: 1px solid #e0e0e0;
}
.legend-title {
  font-weight: bold;
  margin-bottom: 6px;
  color: #01579b;
}
.legend-scale {
  display: flex;
  flex-direction: row;
  height: 16px;
  margin-bottom: 4px;
}
.legend-color {
  flex: 1;
  height: 100%;
  border-radius: 2px;
}
.legend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #444;
  margin-top: 2px;
}
.province-label {
  pointer-events: none;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 4px #01579b, 0 0px 2px #222;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  opacity: 0.95;
}
</style> 