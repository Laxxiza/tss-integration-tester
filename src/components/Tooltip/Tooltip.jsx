export default function Tooltip({ message, children, icon, offset=52 }) {
    //console.log(offset);
    return (
        <div className="group relative flex max-w-max flex-col items-center justify-center">
            {children}
            <div style={{left: offset}} className={`absolute pointer-events-none min-w-max scale-0 group-hover:scale-100 group-hover:opacity-100 opacity-0 tarnsform transition-opacity delay-200 ease-in-out z-10 cursor-default`}>
                <div className="flex items-center shadow-lg">
                    <div className="inline-flex rounded tooltip p-2 text-center text-sm text-white gap-2 border-1 tooltip-border">
                        {icon}
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
