import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'sergio-developer',
    api_key: '685413859886974',
    api_secret: 'sCi8qZpPrfHnIBIMtGTNeMcW0hE',
    secure: true
});

describe('Pruebas en fileUpload', () => { 

    test('Debe de subir el archivo correctamente a Cloudinary', async () => { 

        const imageUrl = 'https://images.ctfassets.net/hrltx12pl8hq/3E5SSUuJCKt1KyebMAdr7f/6b98ce27789b03a6b4a62092ea4566b6/Group_5_B.jpg?fit=fill&w=600&h=400'
        const resp = await fetch( imageUrl )
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload ( file );

        expect( typeof url ).toBe('string');

        const segments = url.split('/')
       const imageId = segments[ segments.length - 1 ].replace('.jpg','')
       
        const cloudResp =  await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });


     });

     test('Debe de retornar Null', async () => { 

        const file = new File([], 'foto.jpg')

        const url = await fileUpload ( file )

        expect( url ).toBe( null )



      })

 });