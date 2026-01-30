import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// 纽约市真实电影院数据
const theatresData = [
    // 曼哈顿 (Manhattan)
    { id: 1, name: 'AMC Empire 25', lat: 40.7569, lng: -73.9882, zip: '10036', address: '234 W 42nd St' },
    { id: 2, name: 'Regal Union Square 14', lat: 40.7359, lng: -73.9911, zip: '10003', address: '850 Broadway' },
    { id: 3, name: 'AMC Lincoln Square 13', lat: 40.7738, lng: -73.9824, zip: '10023', address: '1998 Broadway' },
    { id: 4, name: 'AMC 34th Street 14', lat: 40.7496, lng: -73.9885, zip: '10001', address: '312 W 34th St' },
    { id: 5, name: 'Alamo Drafthouse Downtown Brooklyn', lat: 40.6926, lng: -73.9876, zip: '11201', address: '445 Albee Square W' },
    { id: 6, name: 'IFC Center', lat: 40.7306, lng: -74.0001, zip: '10014', address: '323 6th Ave' },
    { id: 7, name: 'Angelika Film Center', lat: 40.7280, lng: -73.9960, zip: '10012', address: '18 W Houston St' },
    { id: 8, name: 'Film Forum', lat: 40.7280, lng: -74.0040, zip: '10014', address: '209 W Houston St' },
    { id: 9, name: 'Village East Cinema', lat: 40.7267, lng: -73.9851, zip: '10003', address: '189 2nd Ave' },
    { id: 10, name: 'Landmark at 57 West', lat: 40.7650, lng: -73.9794, zip: '10019', address: '157 W 57th St' },
    { id: 11, name: 'AMC Loews Kips Bay 15', lat: 40.7425, lng: -73.9794, zip: '10016', address: '570 2nd Ave' },
    { id: 12, name: 'Quad Cinema', lat: 40.7343, lng: -73.9971, zip: '10011', address: '34 W 13th St' },
    { id: 13, name: 'Nitehawk Cinema Prospect Park', lat: 40.6616, lng: -73.9718, zip: '11215', address: '188 Prospect Park West' },

    // 皇后区 (Queens)
    { id: 14, name: 'AMC Bay Terrace 6', lat: 40.7798, lng: -73.7713, zip: '11360', address: '26-01 Bell Blvd' },
    { id: 15, name: 'Alamo Drafthouse Downtown Manhattan', lat: 40.7142, lng: -74.0088, zip: '10006', address: '28 Liberty St' },
    { id: 16, name: 'Regal UA Midway', lat: 40.7373, lng: -73.8803, zip: '11373', address: '108-22 Queens Blvd' },
    { id: 17, name: 'AMC Fresh Meadows 7', lat: 40.7346, lng: -73.7938, zip: '11366', address: '190-02 Horace Harding Expy' },
    { id: 18, name: 'Showcase Cinema de Lux Cross County', lat: 40.9299, lng: -73.8658, zip: '10704', address: '86 Mall Walk' },
    { id: 19, name: 'UA Kaufman Astoria Stadium 14', lat: 40.7599, lng: -73.9287, zip: '11106', address: '35-30 38th St' },
    { id: 20, name: 'Museum of the Moving Image', lat: 40.7567, lng: -73.9238, zip: '11106', address: '36-01 35th Ave' },
    { id: 21, name: 'Cinemart Flushing', lat: 40.7598, lng: -73.8303, zip: '11354', address: '136-20 38th Ave' },
    { id: 22, name: 'Queensborough Theatre', lat: 40.7571, lng: -73.8265, zip: '11355', address: '42-14 Kissena Blvd' },

    // 布鲁克林 (Brooklyn)
    { id: 23, name: 'Alamo Drafthouse Brooklyn', lat: 40.6926, lng: -73.9876, zip: '11201', address: '445 Albee Square W' },
    { id: 24, name: 'Nitehawk Cinema Williamsburg', lat: 40.7149, lng: -73.9570, zip: '11211', address: '136 Metropolitan Ave' },
    { id: 25, name: 'Regal UA Court Street Stadium 12', lat: 40.6881, lng: -73.9912, zip: '11201', address: '106 Court St' },
    { id: 26, name: 'BAM Rose Cinemas', lat: 40.6867, lng: -73.9800, zip: '11217', address: '30 Lafayette Ave' },
    { id: 27, name: 'Cobble Hill Cinemas', lat: 40.6866, lng: -73.9960, zip: '11201', address: '265 Court St' },
    { id: 28, name: 'iPic Fulton Market', lat: 40.6889, lng: -73.9784, zip: '11201', address: '420 Albee Square W' },
    { id: 29, name: 'Williamsburg Cinemas', lat: 40.7135, lng: -73.9573, zip: '11211', address: '217 Grand St' },
    { id: 30, name: 'Syndicated Bar Theater Kitchen', lat: 40.7063, lng: -73.9282, zip: '11237', address: '40 Bogart St' },

    // 布朗克斯 (Bronx)
    { id: 31, name: 'AMC Bay Plaza Cinema 13', lat: 40.8655, lng: -73.8276, zip: '10469', address: '2210 Bartow Ave' },
    { id: 32, name: 'Alamo Drafthouse Lower Manhattan', lat: 40.7142, lng: -74.0088, zip: '10006', address: '28 Liberty St' },
    { id: 33, name: 'Showcase Cinema de Lux Ridge Hill', lat: 40.9088, lng: -73.8633, zip: '10701', address: '41 Saw Mill River Rd' },

    // 史坦顿岛 (Staten Island)
    { id: 34, name: 'UA Staten Island Stadium 16', lat: 40.5819, lng: -74.1652, zip: '10314', address: '2474 Forest Ave' },
    { id: 35, name: 'AMC Loews Staten Island 11', lat: 40.5472, lng: -74.1820, zip: '10309', address: '2474 Hylan Blvd' },

    // 更多皇后区影院（靠近11357）
    { id: 36, name: 'AMC Whitestone Cinemas', lat: 40.7900, lng: -73.8100, zip: '11357', address: '2505 Bruckner Blvd' },
    { id: 37, name: 'College Point Multiplex Cinemas', lat: 40.7872, lng: -73.8456, zip: '11356', address: '28-55 Ulmer St' },
    { id: 38, name: 'Flushing Cinemas', lat: 40.7614, lng: -73.8322, zip: '11354', address: '135-03 40th Rd' },
];

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // NYC center

// 使用 Google Geocoding API 获取 zip code 的坐标
const getLocationFromZip = async (zipCode, apiKey) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},New York,NY&key=${apiKey}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
    }
    return null;
};

const FindATheatre = () => {
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [searchZip, setSearchZip] = useState('');
    const [mapBounds, setMapBounds] = useState(null);
    const [showAllResults, setShowAllResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const mapRef = useRef(null);

    const apiKey = 'AIzaSyAYH6zMDHCVsVJ1I1ffPGgb1yoDnvH6ETc'; // 替换成你的真实 API Key

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

    if (!isLoaded) return <div className="flex items-center justify-center h-screen bg-black text-white">Loading Map...</div>;

    // 检查影院是否在地图可视范围内
    const isTheatreInBounds = (theatre) => {
        if (!mapBounds) return true;
        const lat = theatre.lat;
        const lng = theatre.lng;
        return (
            lat >= mapBounds.south &&
            lat <= mapBounds.north &&
            lng >= mapBounds.west &&
            lng <= mapBounds.east
        );
    };

    // 处理地图边界变化
    const handleBoundsChanged = () => {
        if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            if (bounds) {
                setMapBounds({
                    north: bounds.getNorthEast().lat(),
                    south: bounds.getSouthWest().lat(),
                    east: bounds.getNorthEast().lng(),
                    west: bounds.getSouthWest().lng(),
                });
            }
        }
    };

    // 搜索 zip code
    const handleSearch = async () => {
        if (!searchZip.trim()) {
            alert('Please enter a zip code');
            return;

        }

        setIsSearching(true);
        const location = await getLocationFromZip(searchZip.trim(), apiKey);

        if (location && mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(14);
            setShowAllResults(false);
        } else {
            alert('Zip code not found. Please try another.');
        }
        setIsSearching(false);
    };

    // 处理选择影院
    const handleSelectTheatre = (theatre) => {
        setSelectedTheatre(theatre);
        if (mapRef.current) {
            mapRef.current.panTo({ lat: theatre.lat, lng: theatre.lng });
            mapRef.current.setZoom(16);
        }
    };

    // 根据搜索过滤影院
    const filteredTheatres = searchZip.trim()
        ? theatresData.filter((theatre) => theatre.zip.includes(searchZip.trim()))
        : theatresData;

    // 在地图可视范围内的影院
    const theatresInView = filteredTheatres.filter(isTheatreInBounds);

    // 在地图可视范围外的影院
    const theatresOutOfView = filteredTheatres.filter(
        (theatre) => !isTheatreInBounds(theatre)
    );

    // 决定显示哪些影院
    const displayedTheatres = showAllResults
        ? filteredTheatres
        : theatresInView;

    return (
        <section id='find-a-theatre' className="px-8 md:px-16 py-12 bg-black text-white">
            {/* 标题 */}
            <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
                <h2 className="text-3xl font-extrabold tracking-tight uppercase">
                    Find a Theatre
                </h2>
            </div>

            {/* 左右布局 */}
            <div className="flex flex-col lg:flex-row h-[600px] gap-4">
                {/* 左边地图 */}
                <div className="flex-1 rounded-2xl overflow-hidden">
                    <GoogleMap
                        onLoad={(map) => {
                            mapRef.current = map;
                            handleBoundsChanged();
                        }}
                        onBoundsChanged={handleBoundsChanged}
                        mapContainerStyle={mapContainerStyle}
                        center={defaultCenter}
                        zoom={11}
                        options={{
                            styles: [
                                {
                                    featureType: "all",
                                    elementType: "geometry",
                                    stylers: [{ color: "#242f3e" }]
                                },
                                {
                                    featureType: "all",
                                    elementType: "labels.text.stroke",
                                    stylers: [{ color: "#242f3e" }]
                                },
                                {
                                    featureType: "all",
                                    elementType: "labels.text.fill",
                                    stylers: [{ color: "#746855" }]
                                }
                            ]
                        }}
                    >
                        {filteredTheatres.map((theatre) => (
                            <Marker
                                key={theatre.id}
                                position={{ lat: theatre.lat, lng: theatre.lng }}
                                onClick={() => handleSelectTheatre(theatre)}
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    fillColor: selectedTheatre?.id === theatre.id ? '#EF4444' : '#DC2626',
                                    fillOpacity: 1,
                                    strokeColor: '#FFFFFF',
                                    strokeWeight: 2,
                                    scale: selectedTheatre?.id === theatre.id ? 10 : 7,
                                }}
                            />
                        ))}
                    </GoogleMap>
                </div>

                {/* 右边列表 + 搜索 */}
                <div className="flex-1 flex flex-col bg-gray-900 text-white p-6 rounded-2xl">
                    {/* 搜索框 */}
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Enter NYC zip code"
                            value={searchZip}
                            onChange={(e) => setSearchZip(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1 p-3 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold disabled:opacity-50"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {/* 结果统计 */}
                    <div className="mb-4 text-sm text-gray-400">
                        {searchZip.trim() ? (
                            <span>Found {filteredTheatres.length} theatre(s) for zip code {searchZip}</span>
                        ) : (
                            <span>Showing all {theatresData.length} theatres in NYC</span>
                        )}
                    </div>

                    {/* 影院列表 */}
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {displayedTheatres.length > 0 ? (
                            displayedTheatres.map((theatre) => (
                                <div
                                    key={theatre.id}
                                    className={`p-4 cursor-pointer rounded-lg transition-all duration-200 ${
                                        selectedTheatre?.id === theatre.id
                                            ? 'bg-red-600 text-white shadow-lg transform'
                                            : 'bg-gray-800 text-white hover:bg-gray-700'
                                    }`}
                                    onClick={() => handleSelectTheatre(theatre)}
                                >
                                    <div className="font-bold text-lg mb-1">{theatre.name}</div>
                                    <div className="text-sm opacity-90">{theatre.address}</div>
                                    <div className="text-sm opacity-75 mt-1">
                                        Zip: {theatre.zip}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-12">
                                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p>No theatres found for this zip code</p>
                                <p className="text-sm mt-2">Try a different NYC zip code</p>
                            </div>
                        )}
                    </div>

                    {/* More 按钮 */}
                    {!showAllResults && theatresOutOfView.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <button
                                onClick={() => setShowAllResults(true)}
                                className="w-full text-red-500 hover:text-red-400 font-bold transition-colors inline-flex items-center justify-end gap-2 text-lg"
                            >
                                more ({theatresOutOfView.length}) →
                            </button>
                        </div>
                    )}

                    {/* 返回按钮（当显示全部结果时） */}
                    {showAllResults && (
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <button
                                onClick={() => setShowAllResults(false)}
                                className="w-full text-red-500 hover:text-red-400 font-bold transition-colors inline-flex items-center justify-start gap-2"
                            >
                                ← Show map view only
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FindATheatre;