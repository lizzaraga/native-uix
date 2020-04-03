import React from 'react'
import { StyleSheet , Dimensions, View, Animated, PanResponder} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width

const CHILDREN_COUNT = 3

class SwipePager extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            current_page: 0,
            drag_x: new Animated.Value(0),

        }
        
        this.scrollAmount = 0
        this.drag_x = new Animated.Value(0)
        this.drag_xn = Animated.multiply(this.drag_x, -1)
        
        this.SwipeResponder = PanResponder.create({
            onMoveShouldSetPanResponder : (e) => true,
            onPanResponderGrant: (e, g) => {
                this.drag_x.setOffset(this.drag_x._value)
            },
            onPanResponderMove : Animated.event([
                null,
                {
                    dx:  this.drag_x
                }
            ], {useNativeDriver: false}),
            onPanResponderRelease: (e, g) => {
                this.scrollAmount += g.dx;

                let gap = this.scrollAmount + SCREEN_WIDTH*2
                if(gap < 0)
                {
                    this.scrollAmount = - SCREEN_WIDTH*2
                    this.drag_x.setValue(this.scrollAmount)
                    this.drag_x.setOffset(0)
                }

                let gap2 = this.scrollAmount + SCREEN_WIDTH
                if(gap2 > SCREEN_WIDTH){
                    
                    
                    this.drag_x.setValue(this.scrollAmount)
                    this.drag_x.setOffset(-this.scrollAmount)

                    this.scrollAmount = 0;
                   
                }

                console.log('Scroll amount', this.scrollAmount)

                this.drag_x.flattenOffset()
                
            }
        })
    }
    
    render(){

        const dragX = this.drag_xn.interpolate({
            inputRange:[0, (CHILDREN_COUNT - 1)*SCREEN_WIDTH],
            outputRange: [0, -(CHILDREN_COUNT - 1 )*SCREEN_WIDTH],
            extrapolate: 'clamp'
        })

        return (
            <Animated.View {...this.SwipeResponder.panHandlers} style = {[styles.container, {transform :  [{translateX: (dragX)}]}]}>
                <View style = {[styles.children, {backgroundColor: 'green'}]}></View>
                <View style = {[styles.children, {backgroundColor: 'red'}]}></View>
                <View style = {[styles.children, {backgroundColor: 'yellow'}]}></View>
            </Animated.View>
        )
    }

    // static Pager = class extends React.Component {
        
    // }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#000050",
        width: SCREEN_WIDTH * 3
    },
    children:{
        width: SCREEN_WIDTH,
        flex: 1
    },
    
})

export default SwipePager;

