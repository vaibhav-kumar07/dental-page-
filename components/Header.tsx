import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 gap-3">
        {/* Branding */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-white rounded-full p-3 shadow-lg text-3xl">🦷</div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide">
              Guru Dental Clinic
            </span>
            <span className="text-sm italic font-light text-blue-100">
              “Crafting Healthy Smiles with Care”
            </span>
          </div>
        </Link>

        {/* Doctor Info */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-2 text-center shadow-sm">
          <p className="text-base font-semibold">Dr. Lovepreet Singh</p>
          <p className="text-xs text-gray-100">BDS (General Dentist)</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
