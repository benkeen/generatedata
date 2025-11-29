import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    margin: '12px 0 14px'
    // 	&>div {
    // 		flex: 1;

    // 		&>label {
    // 			height: 20px;
    // 			color: #555555;
    // 			display: block;
    // 		}
    // 	}
    // 	ul {
    // 		list-style: none;
    // 		padding: 0;
    // 		margin: 0 20px 0 0;
    // 		line-height: 30px;
    // 		li {
    // 			display: flex;
    // 			align-items: center;
    // 			input {
    // 				margin: 0 6px 0 0;
    // 			}
    // 		}
    // 	}
  },
  batchSize: {
    display: 'flex',
    alignItems: 'center',
    height: '31px'
    // 	> span {
    // 		height: 38px;
    // 		margin-right: 4px;
    // 	}
    // 	> label {
    // 		margin: 0 4px 0 5px;
    // 	}
    // 	input {
    // 		margin-top: -2px;
    // 	}
  },
  withBrace: {
    height: '58px'
  },
  batchSizeHyphen: {
    color: '#cccccc'
  },
  brace: {
    fontSize: '50px',
    color: '#dddddd',
    marginTop: '-40px'
  },
  block: {
    marginBottom: '10px'
    // 	.title {
    // 		margin: 0 0 8px;
    // 		color: #555555;
    // 	}
  },
  title: {
    margin: '0 0 8px',
    color: '#555555'
  }
});
