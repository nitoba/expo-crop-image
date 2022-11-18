Allows user to crop image with given aspect ratio for react native using expo on Android and IOS - (Workaround for IOS always square images).

### API

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
import ImageEditor from "expo-image-cropper";

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
