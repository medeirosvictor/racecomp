const CardRace = ({ obj }) => {
    return (
        <div
            style={{
                backgroundImage:
                    "url('src/assets/images/track-placeholder.jpg')",
            }}
            className="flex flex-col border border-gray p-3 rounded-md max-w-md min-h-[200px] justify-start bg-cover"
        >
            <div className="backdrop-blur-md backdrop-grayscale-0 bg-white/30 p-2 rounded w-80 h-28">
                <p className="text-2xl">{obj.title}</p>
                <p className="text-sm">{obj.description}</p>
            </div>
        </div>
    );
};

export default CardRace;
