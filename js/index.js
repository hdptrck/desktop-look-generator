window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('.image-container'); // $('img')[0]
            img.style.backgroundImage = "url('" + URL.createObjectURL(this.files[0]) + "')"; // set src to blob url
            img.onload = imageIsLoaded(img);
        }
    });
});

const scaleFactorSelect = document.getElementById("select-image-size");
const imageAlignementSelect = document.getElementById("select-image-alignment");
const imageToAlign = document.getElementById("image-to-alignment");

document.getElementById("image-download").addEventListener("click", () => {
    const exportContainer = document.getElementById("export-container");
    const scaleFactor = scaleFactorSelect.options[scaleFactorSelect.selectedIndex].value;
    console.log("scaleFactor: ", scaleFactor);
    window.scrollTo(0, 0);
    html2canvas(exportContainer, {
        allowTaint: true,
        backgroundColor: colors[0],
        scale: scaleFactor
    }).then((canvas) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        downloadLink.download = 'desktop-look.jpg';
        downloadLink.click();
    });
});

const computedStyle = getComputedStyle(document.body);
const colorInputs = document.querySelectorAll("input[type=color]");
const colors = new Array();

colorInputs.forEach((colorInput, index) => {
    colorInput.value = computedStyle.getPropertyValue("--" + colorInput.name).replace(/\s/g, "");

    colorInput.addEventListener("input", () => {
        document.documentElement.style.setProperty("--" + colorInput.name, colorInput.value);
        colors[index] = colorInput.value;
        console.log(colors[index])
    });
});

imageAlignementSelect.addEventListener("change", () => {
    const classValue = imageAlignementSelect.options[imageAlignementSelect.selectedIndex].value;
    imageToAlign.className = "monitor image-container " + classValue;
});
