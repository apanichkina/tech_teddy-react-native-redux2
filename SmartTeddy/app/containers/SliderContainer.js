var DEFAULT_VALUE = 0.2;

var SliderContainer = React.createClass({
    getInitialState() {
        return {
            value: DEFAULT_VALUE
        };
    },

    render() {
        var value = this.state.value;

        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.caption} numberOfLines={1}>{this.props.caption}</Text>
                    <Text style={styles.value} numberOfLines={1}>{value}</Text>
                </View>
                {this._renderChildren()}
            </View>
        );
    },

    _renderChildren() {
        return React.Children.map(this.props.children, (child) => {
            if (child.type === Slider
                || child.type === ReactNative.Slider) {
                var value = this.state.value;
                return React.cloneElement(child, {
                    value: value,
                    onValueChange: (val) => this.setState({value: val}),
                });
            } else {
                return child;
            }
        });
    },
});