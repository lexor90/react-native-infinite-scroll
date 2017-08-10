# Infinite Scroll

React native infinite scroll component for Android & iOS.

Tested with Android 4.1+ and iOS 10.

## Install

    npm install --save react-native-infinite-scroll

## Usage
```js
<InfiniteScroll
   // make sure to use a function signature, not this.loadMorePages()!
  onLoadMoreAsync={this.loadMorePages}
  horizontal={false}  // true - if you want in horizontal
  style={styles.scrollView}
  {...prop}
>
  {...children}
</InfiniteScroll>
```


### Example

```js
import React, { Component } from 'react';
import { Text, ListView } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scroll';

class Example extends Component ({
  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var rows = ["China","Korea","Singapore","Malaysia"]
    return {
      data: rows,
      dataSource: ds.cloneWithRows(rows)
    }
  },
  loadMorePage(){
    //here .. collect the data from server somehow
    let new_data = ['Japan','Myanmar','India','Thailand'];
    let rows = this.state.data;
    rows.push.apply(rows, new_data);
    this.setState({
      data: rows,
      dataSource: this.state.dataSource.cloneWithRows(rows)
    });
  },
  render(){
    return (
      <InfiniteScroll
        horizontal={false}  //true - if you want in horizontal
        onLoadMoreAsync={this.loadMorePage}
        distanceFromEnd={10} // distance in density-independent pixels from the right end
        style={styles.scrollView}>
          <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data)=><Text>{data}</Text>}
        />
      </InfiniteScroll>
    );
  }
});


export default Example;
```

### API

You can pass any [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html) property here.

Plus you can provide the following:

* `onLoadMoreAsync` [Function] *no default* reference callback to be executed whenever we reach the end of our scrolling area (the end is not represented by the right border but it's the right border - offset defined by `distanceFromEnd`)
* `distanceFromEnd` [Number] *10* the distance we should call `onLoadMoreAsync` before to reach the right border, useful to get the content before the user hits the end (causing it to stop scrolling while content is loading). You should calculate this with regard to the needed time to render new content (network latency/computing time) and estimate your average item size. The right amount of dp is up to you.

## Credits

Originally based on [infinite-scroll-x](https://github.com/yeyintkoko/infinite-scroll-react-native)