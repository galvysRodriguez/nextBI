import { useAuthStore } from "../hooks/auth/useAuthStore";

const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-10 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const roundness = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const abbreviage = (name, lastname) => {
    return name[0].toUpperCase() + "" + lastname[0].toUpperCase()
      
  };

export function Avatar({ 
    size = 'md',
    background = 'bg-indigo-100',
    color = 'text-blue-800',
    bold = true,
    rounded = 'md'
})
  {
    const {user} = useAuthStore()
    const initials = abbreviage(user?.name || "a", user?.lastname || "b")
    const fullName = `${user?.name || ''} ${user?.lastname || ''}`.trim();

    return (
        <>
            <div 
                className={`
                    ${sizes[size]} 
                    ${background} 
                    ${color} 
                    ${roundness[rounded]}
                    ${bold ? 'font-bold' : 'font-normal'}
                    flex items-center justify-center
                    uppercase
                    select-none
                `}
                aria-label={`Avatar de ${user?.name || 'usuario'}`}
                title={fullName}
                >
                {initials}
            </div>
        </>
    )
}

