// 1. Import React Library
import * as React from "react";
import ReactDOM from "react-dom";

// 2. Import our Data
import Data from "./script/Data";

let main = () => {
    // TODO:
    ReactDOM.render(
        <Gallery images={Data} />,
        // <Thumbnail image={Data[0]}/>,
        document.getElementById("galleryContainer")
    );
};

type Image = {
    src: string,
    thumbSrc: string
}

type GalleryProps = {
    images: Image[]
}

type GalleryState = {
    selected: Image
}

// TODO add selected state

class Gallery extends React.Component<GalleryProps, GalleryState> {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.images[0]
        };
    }

    render() {
        return <div className="gallery">
            <ul className="gallery__master">{
                this.props.images.map((image) => {
                    return <Thumbnail key={image.src}
                            image={image} 
                            onSelect={(image) => this.selectedHandler(image)} />
                })
            }</ul>
            <div className="gallery__detail">
                <div className="gallery__detail-img-wrap">
                    <img className="gallery__detail-img" 
                        src={this.state.selected.src}></img>
                </div>
            </div>
        </div>;
    }

    selectedHandler(image: Image): void {
        this.setState({
            selected: image
        });
    }
}

type ThumbnailProps = {
    image: Image,
    onSelect?: (image: Image) => void,
}

class Thumbnail extends React.Component<ThumbnailProps> {
    render() {
        return <li className="gallery__thumb"
                    onClick={() => this.clickHandler()}>
            <div className="gallery__thumb-img-wrap">
                <img className="gallery__thumb-img" 
                     src={this.props.image.thumbSrc}/>
            </div>
        </li>;
    }

    clickHandler() {
        if (this.props.onSelect !== undefined) {
            this.props.onSelect(this.props.image);
        }
    }
}

window.addEventListener("load", main);