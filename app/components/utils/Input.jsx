

export function Input({ type, onChange, value, name, placeholder, label, error}) {
    return (
      <>
        <label className="block text-gray-700 text-sm font-semibold mb-[1px]">{label}</label>
        <input
          type={type}
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          className={`w-full h-10 px-2 py-0 mb-[2px] border rounded-lg focus:outline-none focus:ring-2 ${
            error 
              ? 'border-red-500 focus:ring-red-300 bg-red-50/50' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
      </>
    );
  }

export function Select({type, onChange, value, name, placeholder, children, label}){
    return (
        <>
            <label className="block text-gray-700 text-sm font-semibold mb-[1px]">{label}</label>
            <select
                type={type}
                onChange={onChange}
                value={value}
                name={name}
                placeholder={placeholder}
                className="w-full h-10 px-2 py-0 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {children}
            </select>
        </>
        
    )
}

export function Button({
    children,
    onClick,
    variant = 'primary', 
    type = 'button',
    isDisabled = false 
  }) {
  
    const baseStyles = 'w-full h-10 px-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300';
  
    const variantStyles = {
        primary: `
          bg-[#085494] 
          text-white 
          hover:bg-[#06457a] 
          disabled:bg-[#b3c7dc] 
          disabled:text-white 
          disabled:cursor-not-allowed 
          disabled:opacity-70
        `,
        secondary: `
          bg-white 
          text-[#085494] 
          border 
          border-[#085494] 
          hover:bg-[#eee] 
          disabled:bg-[#f3f6f9] 
          disabled:text-[#a0aab4] 
          disabled:border-[#c2cfdc] 
          disabled:cursor-not-allowed 
          disabled:opacity-70
        `,
      };

  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]}`}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  }

  export function Footer() {
    return (
      <footer className="bg-blue-950 w-full border-t text-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="w-[80%] mx-auto flex justify-between items-center text-center">
            <div>
              <p className="text-xl">AFTIM</p>
            </div>
            <p className="text-sm">
              © Copyright 2025 - Somos Sistemas. Todos los derechos reservados.
            </p>
            <p className="text-sm">Contacto: +58 (412) 063-5946</p>
          </div>
        </div>
      </footer>
    );
  }
  