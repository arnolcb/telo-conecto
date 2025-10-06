import React, { useState } from 'react';
import { Hotel, Clock, Instagram, Twitter, X } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState({
    '3A': { status: 'disponible', schedule: Array(9).fill('disponible') },
    '3B': { status: 'reservado', schedule: Array(9).fill('reservado') },
    '2A': { status: 'reservado', schedule: Array(9).fill('reservado') },
    '2B': { status: 'en-espera', schedule: Array(9).fill('en-espera') },
    '1A': { status: 'disponible', schedule: Array(9).fill('disponible') },
    '1B': { status: 'disponible', schedule: Array(9).fill('disponible') }
  });

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleRoomClick = (roomId) => {
    if (rooms[roomId].status === 'disponible') {
      setSelectedRoom(roomId);
    }
  };

  const handleTimeSlotClick = (slotIndex) => {
    if (selectedRoom && rooms[selectedRoom].schedule[slotIndex] === 'disponible') {
      const newRooms = { ...rooms };
      newRooms[selectedRoom].schedule[slotIndex] = 'reservado';
      
      const allReserved = newRooms[selectedRoom].schedule.every(s => s === 'reservado');
      if (allReserved) {
        newRooms[selectedRoom].status = 'reservado';
      }
      
      setRooms(newRooms);
      setSelectedRoom(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'disponible': return 'bg-[#E8E4D0]';
      case 'reservado': return 'bg-[#8B4444]';
      case 'en-espera': return 'bg-[#2C3654]';
      default: return 'bg-gray-300';
    }
  };

  const getSlotColor = (status) => {
    switch(status) {
      case 'disponible': return 'bg-[#E8E4D0] hover:bg-[#D5D1BE]';
      case 'reservado': return 'bg-[#A66363]';
      case 'en-espera': return 'bg-[#3D4968]';
      default: return 'bg-gray-300';
    }
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7D2E2E] via-[#E8E4D0] to-[#9B9B9B] flex items-center justify-center p-4">
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2 text-[#E8E4D0]">
            <Clock size={48} />
            <div className="text-5xl font-bold">
              <div className="text-cyan-400">24</div>
              <div className="text-xs -mt-2">HOURS</div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl flex items-center justify-between gap-8">
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Hotel size={64} className="text-[#2C3654]" />
            </div>
            <h1 className="text-6xl font-bold text-[#2C3654] mb-2">
              TELO<br/>CONECTO
            </h1>
            <p className="text-[#2C3654] text-sm tracking-widest">
              PRIVACIDAD, SEGURIDAD Y<br/>RAPIDEZ
            </p>
          </div>

          <div className="flex-1 bg-[#E8E4D0] p-12 rounded-3xl shadow-2xl border-4 border-dashed border-[#9B9B9B]">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2C3654]">
              INICIO DE SESIÓN
            </h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Correo Electrónico"
                className="w-full p-4 border-2 border-[#2C3654] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#7D2E2E]"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-4 border-2 border-[#2C3654] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#7D2E2E]"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-[#2C3654] text-white p-4 rounded-lg font-bold hover:bg-[#3D4968] transition"
              >
                INICIO DE SESIÓN
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Instagram className="text-[#2C3654] cursor-pointer hover:scale-110 transition" size={32} />
              <Twitter className="text-[#2C3654] cursor-pointer hover:scale-110 transition" size={32} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2C3654] flex">
      <div className="w-64 bg-[#1F2640] p-8 flex flex-col">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 mb-8">
            <Clock size={48} />
            <div className="text-4xl font-bold">
              <div>24</div>
              <div className="text-xs -mt-2">HOURS</div>
            </div>
          </div>
        </div>

        <nav className="space-y-4 flex-1">
          <button className="w-full bg-[#2C3654] text-white p-4 rounded-full font-bold hover:bg-[#3D4968] transition">
            HABITACIONES
          </button>
          <button className="w-full bg-[#9B9B9B] text-[#2C3654] p-4 rounded-full font-bold hover:bg-[#ACACAC] transition">
            CONTABILIDAD
          </button>
          <button className="w-full bg-[#9B9B9B] text-[#2C3654] p-4 rounded-full font-bold hover:bg-[#ACACAC] transition">
            PERSONAL
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8 relative">
        <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
          {Object.entries(rooms).map(([roomId, room]) => (
            <div
              key={roomId}
              onClick={() => handleRoomClick(roomId)}
              className={`relative ${room.status === 'disponible' ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'} transition-transform`}
            >
              <div className="bg-[#A67C52] p-6 rounded-lg border-8 border-[#5C4033] shadow-xl">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-[#4A7C9E] h-8 rounded border-2 border-[#2C3654]"></div>
                  ))}
                </div>
                <div className={`${getStatusColor(room.status)} text-[#2C3654] font-bold text-center py-6 rounded-full shadow-lg relative`}>
                  <div className="text-sm uppercase tracking-wider">{room.status.replace('-', ' ')}</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-white text-2xl font-bold tracking-wider">
                  HABITACIÓN {roomId}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 right-8 bg-[#1F2640] p-6 rounded-lg">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#E8E4D0] rounded-full"></div>
              <span className="text-white">DISPONIBLE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#8B4444] rounded-full"></div>
              <span className="text-white">RESERVADO</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#2C3654] rounded-full"></div>
              <span className="text-white">EN ESPERA</span>
            </div>
          </div>
        </div>

        {selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2C3654] p-8 rounded-2xl max-w-2xl w-full mx-4 relative border-4 border-[#E8E4D0]">
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X size={32} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#E8E4D0] rounded-full"></div>
                <h2 className="text-3xl font-bold text-white">DISPONIBLE</h2>
              </div>
              
              <p className="text-white mb-2">disponible en horario actual</p>
              <p className="text-white text-xl font-bold mb-6">HABITACIÓN {selectedRoom}</p>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                Horarios disponibles:
                <div className="animate-pulse">👆</div>
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {rooms[selectedRoom].schedule.map((status, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotClick(index)}
                    disabled={status !== 'disponible'}
                    className={`${getSlotColor(status)} p-6 rounded-full font-bold transition-all ${
                      status === 'disponible' ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                    }`}
                  >
                    {status === 'disponible' ? `${8 + index}:00` : '●'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;