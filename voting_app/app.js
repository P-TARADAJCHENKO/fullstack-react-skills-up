const ProductList = React.createClass({
    getInitialState: function () {
        return {
            products: [],
        };
    },
    componentDidMount: function () {
        this.updateState();
    },
    updateState: function () {
        const products = Data.sort((a, b) => {
            return b.votes - a.votes;
        });
        this.setState({ products: products });
    },
    handleProductVote: function (productId, vote) {
        Data.forEach((el) => {
            if (el.id === productId) {
                el.votes = el.votes + vote;
                return;
            }
        });
        this.updateState();
    },
    render: function () {
        const products = this.state.products.map((product) => {
            return (
                <Product
                    key={'product-' + product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    url={product.url}
                    votes={product.votes}
                    submitter_avatar_url={product.submitter_avatar_url}
                    product_image_url={product.product_image_url}
                    onVote={this.handleProductVote}
                />
            );
        });
        return (
            <div className="ui items">
                {products}
            </div>
        );
    }
});

const Product = React.createClass({
    handleUpVote: function () {
        this.props.onVote(this.props.id, 1);
    },
    handleDownVote: function () {
        this.props.onVote(this.props.id, -1);
    },
    render: function () {
        return (
            <div className="item">
                <div className="image">
                    <img src={this.props.product_image_url} alt=""/>
                </div>
                <div className="middle aligned content">
                    <div className="header">
                        <a onClick={this.handleUpVote}>
                            <i className="large caret up icon"></i>
                        </a>
                        {this.props.votes}
                        <a onClick={this.handleDownVote}>
                            <i className="large caret down icon"></i>
                        </a>
                    </div>
                    <div className="description">
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                    </div>
                    <div className="extra">
                        <span>Submitted by:</span>
                        <img src={this.props.submitter_avatar_url} alt="" className="ui avatar image"/>
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <ProductList/>,
    document.getElementById('content')
);