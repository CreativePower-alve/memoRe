import { InMemoryDbService } from 'angular-in-memory-web-api';


export class FakeData implements InMemoryDbService {

    createDb() {
        let tags = [ {id:1, name: 'quotes'}, {id: 2, name: 'affirmations'}];
        let things = [{
                    "id": 1,
                    "text": "Your inner journey only has one: the step you are taking right now",
                    "source": "unknown",
                    "tags": [1]
                }, {
                    "id": 2,
                    "text": "Let go of the thoughts that don't make you strong",
                    "source": "unknown",
                    "tags": [1]
                }, {
                    "id": 3,
                    "text": "The aim of life is to live, and to live means to be aware, joyously, drunkenly, serenely, divinely aware.",
                    "source": "unknown",
                    "tags": [1]
                }, {
                    "id": 4,
                    "text": "It is not the hours we put in on the job, it is what we put into the hours that counts",
                    "source": "unknown",
                    "tags": [1]
                }, {
                    "id": 5,
                    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L orem Ipsum passages, and more recently with desktop publishing s oftware like Aldus PageMaker including versions of Lorem Ipsum.",
                    "source": "unknown",
                    "tags": [2]
                }, {
                    "id": 6,
                    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L orem Ipsum passages, and more recently with desktop publishing s oftware like Aldus PageMaker including versions of Lorem Ipsum.",
                    "source": "unknown",
                    "tags": [2]
                }, {
                    "id": 7,
                    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L orem Ipsum passages, and more recently with desktop publishing s oftware like Aldus PageMaker including versions of Lorem Ipsum.",
                    "source": "unknown",
                    "tags": [2]
                }, {
                    "id": 8,
                    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L orem Ipsum passages, and more recently with desktop publishing s oftware like Aldus PageMaker including versions of Lorem Ipsum.",
                    "source": "unknown",
                    "tags": [2]
                }
        ];
        return { tags, things };
    }
}
