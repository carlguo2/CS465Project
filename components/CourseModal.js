function CourseModal() {
    return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTextTitle}>{course.Subject + "   " + course.Number + "   "}</Text>
                    <Text style={styles.modalTextName}>{course.Name}</Text>
                    <Text style={styles.modalText}>{"Hours: " + course["Credit Hours"][0]}</Text>
                    <Text style={styles.modalText}>{"Section: " + course.Section}</Text>
                    <Text style={styles.modalText}>{"Type: " + course["Type Code"]}</Text>
                    <Text style={styles.modalText}>{"Instructor: " + course.Instructors}</Text>
                    <Text style={styles.modalText}>{"Location: " + course.Building + " " + course.Room}</Text>
                    <Text style={styles.modalTextPrereq}>{course["Section Info"]}</Text>
                    <Text style={styles.modalTextName}>Times</Text>
                    <View style={[styles.container, {flexDirection: "row"}]}>
                        <Pressable
                        style={[styles.button, styles.buttonAdd]}
                        onPress={() => alert("Added!")}
                        >
                            <Text style={styles.textStyle}>Add</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    </View>);
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: "#ff5e3b",
        borderWidth: 5,
    },
    scroll:{
        backgroundColor: "#fc840360"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonAdd: {
          backgroundColor: "#2196F3",
          marginRight: 40
    },
    buttonClose: {
        backgroundColor: "#c4c4c4",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
    },
    modalTextPrereq: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        backgroundColor: "#fcf9b8",
        padding: 5
    },
    modalTextTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24
    },
    modalTextName: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 19
    }
});

export default CourseModal;