import Link from "next/link"

export function ButtonCreate() {
  return (
    <Link href="/dashboard/finance/create">
      <button className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Crear
      </button>
    </Link>
  );
}
