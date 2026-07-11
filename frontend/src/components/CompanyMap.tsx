import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Company } from '../types';

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface Props {
  companies: Company[];
}

const DUESSELDORF: [number, number] = [51.2277, 6.7735];

export default function CompanyMap({ companies }: Props) {
  return (
    <MapContainer center={DUESSELDORF} zoom={9} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {companies.flatMap((company) =>
        company.addresses.map((address) => (
          <Marker key={address.id} position={[address.latitude, address.longitude]}>
            <Popup>
              <strong>{company.name}</strong>
              <br />
              {address.street} {address.houseNumber}
              <br />
              {address.postalCode} {address.city}
            </Popup>
          </Marker>
        )),
      )}
    </MapContainer>
  );
}
