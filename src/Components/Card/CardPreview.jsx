import Embed from 'react-embed';
import ReactPlayer from 'react-player';

const CardPreview = ({ obj }) => {
    const { url } = obj;

    const checkItYouTube = str => {
        if (str.includes('youtube') || str.includes('youtu.be')) {
            return true;
        } else {
            false;
        }
    };

    return (
        <div className="flex flex-col border border-gray p-3 rounded-md max-w-md min-h-[300px] justify-start bg-cover">
            {checkItYouTube ? (
                <ReactPlayer
                    url={url}
                    config={{
                        youtube: {
                            playerVars: { origin: 'https://www.youtube.com' },
                        },
                    }}
                />
            ) : (
                <Embed url={url} />
            )}
        </div>
    );
};

export default CardPreview;
