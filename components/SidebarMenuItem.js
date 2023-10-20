const SidebarMenuItem = ({ text, Icon, active }) => {
  return (
    <div className="hoverEffect flex items-center text-gray-700  space-x-3 justify-center xl:justify-start">
      <Icon className="h-7 " />
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
};

export default SidebarMenuItem;
