import React from "react";

class App extends React.Component {
  state = {
    image: "",
    loading: false
  };

  uploadImage = async e => {
    const files = e.target.files;

    const data = new FormData();
    // Selects the first file
    data.append("file", files[0]);
    //Required for Uploading in cloudinary
    data.append("upload_preset", "vsgpv45j");

    this.setState({
      ...this.state,
      loading: true
    });
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/rautan/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      loading: false
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Upload Image</h1>
        <input
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={this.uploadImage}
        />
        <img src={this.state.image} />
      </div>
    );
  }
}

export default App;
