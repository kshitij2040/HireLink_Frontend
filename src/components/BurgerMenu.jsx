import { useRouter } from 'next/navigation';

export default function BurgerMenu() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/Register'); // Redirect to login page
  };

  return (
    <div className="relative">
      <button
        onClick={handleRedirect}
        className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
      >
        Add
      </button>
    </div>
  );
}
