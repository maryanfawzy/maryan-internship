import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import Slider from "react-slick";


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchHotCollections() {
    setLoading(true);
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    console.log(fetchHotCollections)
    setLoading(true);
    setHotCollections(response.data);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    
  };

  return (
   



<section id="section-collections" className="no-bottom">
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="text-center">
        <h2>Hot Collections</h2>
        <div className="small-border bg-color-2"></div>
      </div>
    </div>
    <Slider {...settings}>
    {              hotCollections.map((collections, index) => (
                <div className="p-2" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collections.nftId}`}>
                        <img
                          src={collections.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collections.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collections.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collections.title}</h4>
                      </Link>
                      <span>ERC-{collections.code}</span>
                    </div>
                  </div>
                </div>
))}
    </Slider>


  </div>
</div>
</section>

      
      


  );
};

export default HotCollections;