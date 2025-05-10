import iconMoon from '../assets/icons/icon-moon.svg';

function Header() {
  return (
    <div className="mb-14 flex w-full flex-row items-center justify-between">
      <h1 className="text-[40px] font-bold tracking-[15px] text-[#FFFFFF]">
        TODO
      </h1>
      <button className="transition-transform duration-300 hover:scale-125">
        <img className="h-7 w-7" src={iconMoon} alt="mode switch button" />
      </button>
    </div>
  );
}

export default Header;
