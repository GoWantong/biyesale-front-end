import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import AddShoppingCart from 'material-ui-icons/AddShoppingCart';

import LoadingCircle from '../shared/LoadingCircle/LoadingCircle';

const styleSheet = createStyleSheet('GoodsGridList', {
  root: {
    margin: '60px 0',
  },
  card: {
    display: 'flex',
    margin: 6,
    justifyContent: 'space-around',
    maxHeight: 180,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '55%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    display: 'flex',
    width: '45%',
    background: 'rgba(0,0,0,0.2)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  responseImage: {
    width: '100%',
    maxHeight: 180,
    margin: 'auto',
  },
});

// const styles = {
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   gridList: {
//     width: '100%',
//   },
// };

function GoodsGridList(props) {
  const goodsList = props.goodsList;
  const { showGoodsDetail, addToShoppingCart, loadCartsList } = props;
  const classes = props.classes;

  function addToCartAndRefresh(e, id) {
    e.stopPropagation();
    return Promise.resolve({ e, id })
    .then(msg => addToShoppingCart(msg.e, msg.id))
    .then(() => {
      loadCartsList();
    });
  }

  if (props.loading) {
    return <LoadingCircle />;
  }

  if (props.error) {
    return (
      <div onTouchTap={props.loadGoodsList}>
        出错了。点击重试。
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {
        goodsList.map((goods, index) => (
          <Card
            className={classes.card}
            key={`commodity-${goods.commodity_id}`}
            onTouchTap={() => showGoodsDetail(index)}
          >
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography type="headline">{goods.name}</Typography>
                <Typography type="subheading" color="secondary">
                  {<span>￥<b>{goods.price}</b></span>}
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton
                  aria-label="addToShoppingCart"
                  onTouchTap={e => addToCartAndRefresh(e, goods.commodity_id)}
                >
                  <AddShoppingCart />
                </IconButton>
              </div>
            </div>
            <div className={classes.cover}>
              <img className={classes.responseImage} src={goods.cover} alt={goods.name} />
            </div>
          </Card>
        ))
      }
    </div>
  );
}

GoodsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  goodsList: PropTypes.array.isRequired,
  loadGoodsList: PropTypes.func.isRequired,
  showGoodsDetail: PropTypes.func.isRequired,
  addToShoppingCart: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  loadCartsList: PropTypes.func.isRequired,
};

GoodsGridList.defaultProps = {
  loading: true,
  error: false,
};

export default withStyles(styleSheet)(GoodsGridList);
