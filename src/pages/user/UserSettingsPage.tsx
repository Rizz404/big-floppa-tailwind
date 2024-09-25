import { Outlet, useNavigate } from "react-router-dom";

const BUTTON_LINKS = [
  { label: "Biodata Diri", link: "" },
  { label: "Daftar Alamat", link: "address" },
  { label: "Pembayaran", link: "address" },
  { label: "Rekening Bank", link: "address" },
  { label: "Notifikasi", link: "address" },
  { label: "Mode Tampilan", link: "address" },
  { label: "Keamanan", link: "address" },
];

const UserSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative mt-24 grid grid-cols-[240px,1fr] gap-8">
      <div className="shadow-md">kintil</div>
      <div className="">
        <div className="mb-6 flex items-center justify-between gap-4 rounded-md border px-4 py-2">
          {BUTTON_LINKS.map((buttonLink) => (
            <button
              type="button"
              key={buttonLink.label}
              className="text-nowrap border-b-orange-500 px-2 py-1 font-medium transition duration-300 ease-in-out hover:border-b hover:text-orange-500"
              onClick={() => navigate(buttonLink.link)}
            >
              {buttonLink.label}
            </button>
          ))}
        </div>
        <Outlet />
      </div>
    </section>
  );
};
export default UserSettingsPage;
