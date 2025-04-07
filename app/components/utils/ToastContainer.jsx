import { ToastContainer } from "react-toastify";


export function ToastContainerModal(){
    return (
        <ToastContainer
            toastClassName="bg-gray-200 text-black font-bold"
            bodyClassName="text-sm"
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />
    )
}