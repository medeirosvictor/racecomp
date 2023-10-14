import ReactPlayer from 'react-player';

const CardPreview = ({ obj, playersAmount }) => {
    const { url } = obj;

    const checkItYouTube = str => {
        if (str.includes('youtube') || str.includes('youtu.be')) {
            return true;
        } else if (str.includes('twitch')) {
            return false;
        }
    };

    const getWidth = () => {
        switch (playersAmount) {
            case 1:
                return '50vw';
            case 2:
                return '45vw';
            case 3:
                return '595px';
            default:
                return '455px';
        }
    };

    return (
        <ReactPlayer
            url={url}
            controls={true}
            width={getWidth()}
            config={
                checkItYouTube && {
                    youtube: {
                        playerVars: { origin: 'https://www.youtube.com' },
                    },
                }
            }
        />
    );
};

export default CardPreview;
