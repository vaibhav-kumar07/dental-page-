import { Phone, Mail, MapPin, Clock } from "lucide-react";

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 ">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white  shadow-sm">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-blue-100">{label}</p>
      <p className="text-sm font-semibold text-white break-words">{value}</p>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-400 to-blue-700 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-3 shadow-lg text-3xl">🦷</div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide">
              Guru Dental Clinic
            </span>
            <span className="text-sm italic font-light text-blue-100">
              “Crafting Healthy Smiles with Care”
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem
            icon={<Phone className="w-5 h-5 text-green-500" />}
            label="Phone"
            value="+91 9877200851"
          />
          <InfoItem
            icon={<Mail className="w-5 h-5 text-red-500" />}
            label="Email"
            value="gurudental0@gmail.com"
          />
          <InfoItem
            icon={<Clock className="w-5 h-5 text-blue-600" />}
            label="Timings"
            value="Mon - Sat: 9:00 AM – 7:00 PM"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30 text-center text-xs py-4">
        © {new Date().getFullYear()} Guru Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
