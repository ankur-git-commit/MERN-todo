import iconMoon from '../assets/icons/icon-moon.svg';

function Header() {
  return (
    <div className="flex flex-row items-center mb-14 justify-between w-full">
      <h1 className="text-[40px] font-bold tracking-[15px] text-[#FFFFFF]">
        TODO
      </h1>
      <img src={iconMoon} alt="mode switch button" />
    </div>
  );
}

export default Header;
