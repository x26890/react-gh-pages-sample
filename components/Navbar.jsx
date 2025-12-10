import { useContext } from "react"
import { CartContext } from "../store"

export default function Navbar() {
    const [state]=useContext(CartContext);
    
    return (<>
            <nav className="navbar navbar-light bg-light">
        <div className="container-fluid ">
            <span className="navbar-brand">甜點蛋糕店</span>
            <button className="btn btn-outline-dark position-relative" type="submit">
                購物車
                <span className="mx-1 badge text-bg-danger rounded-pill">{state.cartList.length}</span>
                </button>
        </div>
        </nav>
    </>)
}