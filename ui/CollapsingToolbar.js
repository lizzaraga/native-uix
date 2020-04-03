import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, Animated, StatusBar} from 'react-native';

const SCREEN_WIDTH = Dimensions.get("screen").width
class CollapsingToolbar extends Component{

    static HEADER_NORMAL_HEIGHT = 0
    static HEADER_COLLAPSING_HEIGHT = 50
    static TABBAR_HEIGHT = 50

    constructor(props){
        super(props)

        this.state = {
            headerScrollY: new Animated.Value(0)
        }
    }

    render(){

        const headerHeight = this.state.headerScrollY.interpolate({
            inputRange: [
               0,  CollapsingToolbar.HEADER_COLLAPSING_HEIGHT - CollapsingToolbar.HEADER_NORMAL_HEIGHT],
            outputRange: [
                CollapsingToolbar.HEADER_COLLAPSING_HEIGHT,
                CollapsingToolbar.HEADER_NORMAL_HEIGHT
            ],
            extrapolate: "clamp"
        })

        
        return (
            <>
                <StatusBar backgroundColor = "#000050" barStyle="light-content"/>
                <View style={styles.container}>
                    <Animated.View style = {[styles.header, {height: headerHeight}]}>

                    </Animated.View>
                    <Animated.View style = {[styles.tabbar, {top: headerHeight}]}></Animated.View>
                    <ScrollView 
                    scrollEventThrottle = {16}
                    contentContainerStyle = {styles.scrollview}
                        onScroll = {
                            Animated.event([
                                {
                                    nativeEvent:{
                                        contentOffset: {y : this.state.headerScrollY}
                                    }
                                }
                            ], {useNativeDriver: false})
                        }
                        >
                        
                        <Text>
                            J'ai vastes braises la dévorant voulais. Mers lassé de acteurs de plus que le ou. Lassé au flammes aux des embaumé éclate plus puis, de furieux frele pussent de dont vu aux de flots. Perdu ma niais ressacs les cerveaux troupeaux mes. D'eau île papillon lâche un fileur tu porte de. Les nasses et est des ma azurs m'a pontons cibles. Future triomphants je crouler yeux montant sous les les bateau. Soleils porteur nuits j'ai marées les vu flots. Cerveaux geindre exquise les de des, le drapeaux des mers parfums des, j'ai perdu sous de que vigueur bleuités et. Un de léger vogueur songer et maritimes. Dans ma flammes mois ne. Par qu'un une rutilements délires a des. Les cinquante sanglot poissons ces tout. Des les fleuves j'ai d'enfants leur noirs, aux de des bons heurté. Éternel couleurs traverser planche travers une baigné. Des eau les l'eau leur yeux vu sous j'ai j'étais, je de sont si cerveaux bleu descend phosphores gonflé yeux. Maritimes plus amour yeux flottaison nasses qu'on courants hippocampes, et les vers éveils ou. Bleu péninsules mers pommes monté que choient atroce. Des poetes géants phosphores peaux-rouges des l'éther ivre. Aux avaient j'ai énormes des sur cieux fortes. Des l'aube courais des savez-vous, des lunules lune atroce pas, n'auraient pénétra quand les je leur le que violettes et. Dérades entonnoirs oiseau de liens furieux. Hystériques de sans enfants d'astres, j'ai mers morves pareils écroulement bleu horribles l'autre monitors. Les ou et et l'ouragan, criards aux des des et vacheries lumineux. A tapages d'ombres parfois qu'une délirants dansé, fleurs mes marées  m'ont enivrantes poeme et, ne l'alcool les fermentent colombes drapeaux nacreux, mer d'oiseaux qu'on gonflé la chanteurs flots, l'homme de leurs tempete électriques monitors d'astres guidé fortes, mur forcer nuits a nacreux ces et, les genoux bateau a courants mes flottaison mers. Roulis plus braises de d'or sidéraux cieux martyr hideux, flots sont ses jour faisaient cataractant, sont bonaces fermentent des a  péninsules. Que des hystériques les pensif. Ou atroce bruns dans baigné morves des de un, mon des ô neiges perdu heurté , l'eau je ravie moi les. De des descend sentant pantheres moi de drapeaux et. L'éveil et de sentis planche la ne blonds a a, roulant furieux les peaux-rouges éveils qu'on lorsqu'a sont aux. Des voguais je plus et glauques mai, courants cotons ces qu'on que, qu'on vacheries l'homme lointains comme parapets.
                        </Text>

                    </ScrollView>
                </View>
            </>
            
        )
    }

}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#000050',
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0,
        zIndex: 62
    },
    tabbar:{
        height: CollapsingToolbar.TABBAR_HEIGHT,
        backgroundColor: '#000050',
        position: 'absolute',
        width: SCREEN_WIDTH,
        left: 0,
        elevation: 5,
        zIndex: 62
    },
    container:{
        flex:1,
        backgroundColor: '#ddd',
    },
    scrollview:{
        padding: 10,
        paddingTop: CollapsingToolbar.HEADER_COLLAPSING_HEIGHT + CollapsingToolbar.TABBAR_HEIGHT + 10
    }
})

export default CollapsingToolbar