import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import LandingPage from "../screen/landing-page.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/LandingPage">
                <LandingPage/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews