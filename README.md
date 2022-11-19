Allows user to crop image with given aspect ratio for react native using expo on Android and IOS - (Workaround for IOS always square images).

### Requirements
To use this package you have to install the following dependencies

[@expo/vector-icons](https://docs.expo.dev/guides/icons/)
[expo-image-manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)
[react-native-gesture-handler](https://docs.expo.dev/versions/latest/sdk/gesture-handler/)

#### ImageEditor

isRequired if there is a \* in the name field

| name                      | Proptypes | Description                                                       |
| ------------------------- | --------- | ----------------------------------------------------------------- |
| **imageUri** \*           | string    |                                                                   |
| **fixedAspectRatio** \*   | number    | Expect => aspect ratio.                                           |
| **minimumCropDimensions** | (size)    | Expect => {width: number, height: number} [Default 100 X 100].    |
| **onEditingCancel** \*    | func      | void                                                              |
| **onEditingComplete** \*  | func      | Returns image object (image object fields => uri, width, height). |

### Example

```jsx
import { ImageEditor } from "expo-crop-image";

<ImageEditor
  imageUri={uri}
  fixedAspectRatio={2 / 3}
  minimumCropDimensions={{
    width: 50,
    height: 50,
  }}
  onEditingCancel={() => {
    console.log("onEditingCancel");
  }}
  onEditingComplete={(image) => {
    console.log(image);
  }}
/>;
```
