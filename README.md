# .placeholder()


This fork adds some additional functionality to match modern browser behaviour: hiding the placeholder only when content is entered.
[johnhunter/jquery-placeholder](https://github.com/johnhunter/jquery-placeholder)

--

A basic jQuery plugin that reads the [**"placeholder"** attribute](http://www.w3schools.com/html5/att_input_placeholder.asp) (HTML5) and renders the placeholder text as an overlay (if not natively supported). Unlike most other plugins, this works by adding a properly-positioned `<span>` on top of the input element rather than setting its value. This keeps form serialization & validation from breaking. 

```javascript
$('input,textarea').placeholder();
```

Check out the [demos](http://johnhunter.github.com/jquery-placeholder/)!

### Options

<table>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td valign="top">force</td>
		<td valign="top"><code>bool</code></td>
		<td valign="top"><code>false</code></td>
		<td valign="top">If <code>true</code>, artificial placeholder elements will be added even if the browser natively supports them.</td>
	</tr>
	<tr>
		<td valign="top">hideOnInput</td>
		<td valign="top"><code>bool</code></td>
		<td valign="top"><code>true</code></td>
		<td valign="top">If <code>true</code>, placeholder is hidden only when the field is non-empty (as per modern browser behaviour).</td>
	</tr>
	<tr>
		<td valign="top">placeholderClass</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'placeholder'</code></td>
		<td valign="top">The css class applied to the artificial placeholder element.</td>
	</tr>
</table>

### CSS Styling

```css
.placeholder { color: #d0d0d0; }
::-webkit-input-placeholder { color: #d0d0d0; }
input:-moz-placeholder, textarea:-moz-placeholder { color: #d0d0d0; }
```