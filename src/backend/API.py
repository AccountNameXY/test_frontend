from watson_developer_cloud import VisualRecognitionV3


#todo implement current date
logindata = {
    'apikey': "8i8qgTm3UJXyPcKJ9qR-X_d3qvvRYlypp7eWXHL0-n4W",
    'version': "2018-03-19",
    'url': "https://gateway.watsonplatform.net/visual-recognition/api"
}

def classify(img):
    visual_recognition = VisualRecognitionV3(
        version=logindata['version'],
        iam_apikey=logindata['apikey']
    )

    classes = visual_recognition.classify(
        img,
        threshold="0.3",
        classifier_ids=['DefaultCustomModel_1031315930', 'cmonman_1929875407', 'default']).get_result()
    return classes

print(type(classify(open("A320.jpg", "rb"))))
