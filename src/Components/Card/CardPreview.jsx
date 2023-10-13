import Embed from 'react-embed';

const CardPreview = ({ obj }) => {
    return (
        <div className="flex flex-col border border-gray p-3 rounded-md max-w-md min-h-[300px] justify-start bg-cover">
            <Embed url={obj.url} />
        </div>
    );
};

export default CardPreview;
