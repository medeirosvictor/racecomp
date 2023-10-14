import Slider from 'react-slick/lib/slider';
import CardLeague from './Card/CardLeague';
import CardPreview from './Card/CardPreview';
import CardRace from './Card/CardRace';

const Carousel = ({ cards }) => {
    const SamplePrevArrow = props => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    zIndex: 1,
                    transform: 'none',
                    top: '100%',
                    marginTop: '10px',
                }}
                onClick={onClick}
            />
        );
    };

    const slidesToShow = () => {
        switch (cards.length) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 4;
            default:
                return 4;
        }
    };

    const settings = {
        dots: true,
        infinite: cards.length > 4 ? true : false,
        speed: 500,
        slidesToShow: slidesToShow(),
        slidesToScroll: slidesToShow(),
        initialSlide: 0,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const getComponent = obj => {
        switch (obj.type) {
            case 'races':
                return <CardRace obj={obj} key={obj.id} />;
            case 'leagues':
                return <CardLeague obj={obj} key={obj.id} />;
            case 'lives':
                return (
                    <CardPreview
                        obj={obj}
                        playersAmount={cards.length}
                        key={obj.id}
                    />
                );
            default:
                return 'SOMETHING WENT WRONG....';
        }
    };

    return (
        <Slider {...settings}>
            {cards.map(obj => {
                return getComponent(obj);
            })}
        </Slider>
    );
};

export default Carousel;
