import Header from "../components/Header/Header";
import ActivityBar from "../components/ActivityBar/ActivityBar";
import Main from "../components/Main/Main";

export default function Layout() {
    return (
        <div
            className="editorPane"
            style={{
                fontFamily: "Inter, ui-sans-serif, system-ui",
            }}
        >
            <Header />
            <main className="flex flex-col min-h-dvh pt-10">
                <div className="relative flex flex-1 overflow-clip">
                    <div className="sticky top-10 flex max-h-[calc(100dvh---spacing(10))] z-30">
                        <div className="flex">
                            <ActivityBar />
                        </div>
                    </div>
                    <Main />
                </div>
            </main>
        </div>
    );
}
