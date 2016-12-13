'use strict';

import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';

export default class InfiniteScroll extends Component {
  
    state = {
      distanceFromEnd: 10
    };
    
    componentWillMount() {
      var self = this;
      
      if (this.props.distanceFromEnd) {
        self.setState({
          distanceFromEnd: this.props.distanceFromEnd
        });
      }
    }

    _handleScroll(event) {
      if(this.props.onScroll){
        this.props.onScroll(event);
      }
      if (this._shouldLoadMore(event)) {
        if(this.props.onLoadMoreAsync){
          this.props.onLoadMoreAsync();
        }
      }
    }

    _shouldLoadMore(event) {
      return this._distanceFromEnd(event) < this.state.distanceFromEnd;
    }

    _distanceFromEnd(event): number {
      let {
        contentSize,
        contentInset,
        contentOffset,
        layoutMeasurement,
      } = event.nativeEvent;

      let contentLength;
      let trailingInset;
      let scrollOffset;
      let viewportLength;
      let horizontal = this.props.horizontal || false;
      if (horizontal) {
        contentLength = contentSize.width;
        trailingInset = contentInset.right;
        scrollOffset = contentOffset.x;
        viewportLength = layoutMeasurement.width;
      } else {
        contentLength = contentSize.height;
        trailingInset = contentInset.bottom;
        scrollOffset = contentOffset.y;
        viewportLength = layoutMeasurement.height;
      }
      
      return contentLength + trailingInset - scrollOffset - viewportLength;
    }

    render() {
      var self = this;
      
      return (
        <ScrollView
        {...this.props}
        automaticallyAdjustContentInsets={false}
        onScroll={self._handleScroll.bind(self)}
        scrollEventThrottle={200}
        >
          {this.props.children}
        </ScrollView>
      );
    }
}