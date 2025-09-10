export default function Headerbar({ children }) {
    return (
        <div className="flex items-center h-9 text-xs sideBarHeader border-bottom border-b w-full">
            {children}
        </div>
    );
}
