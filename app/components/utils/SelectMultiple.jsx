import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated()

const spanishMessages = {
  noOptionsMessage: () => "No hay opciones disponibles",
  loadingMessage: () => "Cargando...",
  placeholder: () => "Seleccione...",
};

export const customSelectStyles = ({ error = false, focusColor = '#3B82F6' } = {}) => ({
    control: (base, { isFocused }) => ({
      ...base,
      width: '100%',
      minHeight: '40px',
      paddingTop: '0',
      paddingBottom: '0',
      border: `1px solid ${error ? '#f87171' : '#e2e8f0'}`, 
      borderRadius: '0.5rem',
      marginBottom: '2px',
      backgroundColor: error ? '#fef2f2' : 'white', 
      boxShadow: isFocused
        ? `0 0 0 2px ${error ? '#fecaca' : focusColor}` 
        : 'none',
      outline: 'none',
      '&:hover': {
        borderColor: error ? '#f87171' : '#cbd5e0', 
      },
    }),
    menu: (base) => ({
      ...base,
      width: '100%',
      maxHeight: '150px',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0',
      marginTop: '4px',
      zIndex: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      maxHeight: '120px',
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? '#ebf4ff' : 'transparent',
      color: '#1a202c',
      '&:active': {
        backgroundColor: '#bee3f8',
      },
    }),
  });

  export default function SelectMultiple({ options, value, onChange, name, label, placeholder, children, error, isDisabled }) {
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
          styles={customSelectStyles({ error })}
          isDisabled={isDisabled}
          instanceId="my-custom-select"
        >
          {children}
          </Select>
      </>
    );
  }

export function SelectSimple({options, value, onChange, name, label, placeholder, children, error, isDisabled}){
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
                styles={customSelectStyles({ error })}
                isDisabled={isDisabled}
                instanceId="my-custom-select"
            >
                {children}
            </Select>
        </>
    )
}