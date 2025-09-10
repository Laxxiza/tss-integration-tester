export default function Header() {
    console.log("Header render");
    return (
        <header className="fixed inset-x-0 top-0 z-20 h-10 flex justify-between items-center px-3 border-bottom tabBg">
            <div className="flex flex-nowrap items-center justify-center">
                <span className="text-lg text-gray-300 text-nowrap">
                    Jinja | Входящие интеграции
                </span>
            </div>
            <div className="flex flex-nowrap items-center justify-center">
                <span className="text-lg text-gray-300 text-nowrap">
                    CummingSon
                </span>
            </div>
        </header>
    );
}
