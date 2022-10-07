import { Card } from "antd"
import Avatar from "../../image/avtar.png"
import product from "../../image/download.jpg"


const Cards = () => {

    return (
        <div style={{ display: "flex" }} >
            <div className="card">
                <img src={product} alt="Avatar" width={350} />
                <div className="container">

                    <div>
                        <h4><b>Product</b></h4>
                        <h6>Details</h6>

                    </div>
                    <div>
                        <h4><b>Price</b></h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cards