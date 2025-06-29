'use client'

import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

export default function FloatingHelpButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open &&(
         <button
            onClick={() => setOpen(!open)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg focus:outline-none"
            aria-label="Ayuda"
        >
            <HelpCircle className="w-6 h-6" />
        </button>
      )}
     

      {open && (
        <div className="mt-2 relative bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          <h4 className="text-sm font-semibold mb-3 text-gray-800">¿Necesitas ayuda?</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/manual/manual.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Descargar Manual de Usuario
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

