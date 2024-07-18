# TailwindVPB (Visual Page Builder)

Tailwind Visual Page Builder is intended to bring all the optimization and developer happiness benefits of Tailwind and supercharge them into pages that can be edited by non-coders, such as as:

* Micromanager clients - You: "That's a great idea, would you like some refresher training so you can add that yourself?"
* Superclients - You: "I know you're hands on and we are so happy to finally empower you to have more control over your site!"
* Rapid prototypers - You: "I'd rather just spin this up super quick and get it live before I lose interest or realize this was just a meme project."
* Designers - You: "I'll do CSS if I absolutely have to, but I'd rather make a website like I do in Figma."

## More documentation to come
This prototype is far too minimal to be usable by anyone (including me). I'm just getting this in another place for redundant storage.

## Installation

### Compilation of TailwindCSS

Per the [official documentation](https://tailwindcss.com/blog/standalone-cli)

For MacOS, Initial Setup:
```sh
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
mv tailwindcss-macos-arm64 tailwindcss

mkdir ./tw_files
touch ./tw_files/input.css
touch ./tw_files/output.css
```

And then:
```sh
# Create a tailwind.config.js file
./tailwindcss init

# Start a watcher
./tailwindcss -i ./tw_files/input.css -o ./tw_files/output.css --watch

# Compile and minify your CSS for production
./tailwindcss -i ./tw_files/input.css -o ./tw_files/output.css --minify
```