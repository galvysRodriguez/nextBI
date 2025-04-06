import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated()

const spanishMessages = {
  noOptionsMessage: () => "No hay opciones disponibles",
  loadingMessage: () => "Cargando...",
  placeholder: () => "Seleccione...",
};

const styleSelect = {
    control: (base, { isFocused }) => ({
      ...base,
      width: '100%',                     
      minHeight: '40px',                 
      paddingTop: '0',                   
      paddingBottom: '0',
      border: '1px solid #e2e8f0',       
      borderRadius: '0.5rem',            
      marginBottom: '16px',              
      boxShadow: isFocused               
        ? '0 0 0 2px #3B82F6' 
        : 'none',
      outline: 'none',                   
      '&:hover': {
        borderColor: '#e2e8f0',         
      },
    }),
    menu: (base) => ({
      ...base,
      width: '100%',                    
      maxHeight: '200px',               
      borderRadius: '0.5rem',            
      border: '1px solid #e2e8f0',       
      marginTop: '4px',                  
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused 
        ? '#ebf4ff'                      
        : 'transparent',
      color: '#1a202c',                  
      '&:active': {
        backgroundColor: '#bee3f8',      
      },
    }),
  };

export default function SelectMultiple({ options, value, onChange, name, label, placeholder, children }) {
  return (
    <>
       <label className="block text-gray-700 text-sm font-semibold mb-[1px]">
          {label}
       </label>
      <Select
        closeMenuOnSelect={false}
        onChange={onChange}
        name={name}
        components={animatedComponents}
        value={value}
        placeholder={placeholder || spanishMessages.placeholder()}
        isMulti
        options={options}
        noOptionsMessage={spanishMessages.noOptionsMessage}
        loadingMessage={spanishMessages.loadingMessage}
        styles={styleSelect}
      >
        {children}
        </Select>
    </>
  );
}


export function SelectSimple({options, value, onChange, name, label, placeholder, children}){
    return(
        <>
            <label className="block text-gray-700 text-sm font-semibold mb-[1px]">
                {label}
            </label>
            <Select
                onChange={onChange}
                name={name}
                components={animatedComponents}
                value={value}
                isClearable={true}
                isSearchable={true}
                placeholder={placeholder || spanishMessages.placeholder()}
                options={options}
                noOptionsMessage={spanishMessages.noOptionsMessage}
                loadingMessage={spanishMessages.loadingMessage}
                styles={styleSelect}
            >
                {children}
            </Select>
        </>
    )
}