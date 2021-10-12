import sys

def normalize(name):
    return name.strip(' ').replace("'", '').replace('ç','c').replace('ã','a').replace('(','').replace(')','').replace('.','').replace('?','').replace('"','').title().replace(' ','')

def outputScene(title, tags, body, templateType):
    if title is None:
        return
    # Make 2 files, normalized(title).tscn, normalized(title).gd
    # put the tags in the gd file
    # put the body as a comment in the gd file
    name = normalize(title)
    tags = ','.join(['"%s"' % x for x in tags.split(' ')])
    body = '\n'.join(['# %s' % x for x in body])
    with open('converted/' + name + '.tscn', 'w', encoding = 'utf-8') as f:
        f.write(gdTemplates[templateType])
    with open('converted/' + name + '.gd', 'w', encoding = 'utf-8') as f:
        f.write(gdTemplates[templateType])
    
def parseHeader(line):
    line = line.replace(':: ','')
    state = 0
    title = ''
    tags = ''
    for ch in line:
        if ch == '{':
            break
        elif ch == '[':
            state = 1
            continue
        elif ch == ']':
            break
        if state == 0:
            title+=ch
        else:
            tags+=ch
    return title, tags

def main():
    state = 0
    fileName = sys.argv[1]
    templateType = sys.argv[2]
    with open(fileName, 'r', encoding = 'utf-8') as f:
        data = f.readlines()
        title = None
        tags = None
        body = []
        for line in data:
            if line.find('::') == 0:
                outputScene(title, tags, body, templateType)
                body = []
                title, tags = parseHeader(line)
                print(title, tags)
            else:
                body.append(line)
	
gdTemplates = {'item': f"""
extends Node
class_name {name}
func get_class():
    return "{name}"
var body
var title = "{title}"
var tags = [{tags}]
func description():
    return ""
func _ready():
    $Panel/ExitButton.connect("pressed", self, "on_exit")
    $Panel/OKButton.connect("pressed", self, "on_accept")
    body = \"\"\"
    
    \"\"\"
	
    {body}
    
func on_exit():
    g.previous()
    
func on_accept():
    pass
    """}
tscnTemplates = {'item': f"""[gd_scene load_steps=5 format=2]

[ext_resource path="res://img/placeholder.png" type="Texture" id=1]
[ext_resource path="res://font_body.tres" type="DynamicFont" id=2]
[ext_resource path="res://passages/{name}.gd" type="Script" id=3]
[ext_resource path="res://font_title.tres" type="DynamicFont" id=4]

[node name="Node" type="Node"]
script = ExtResource( 3 )

[node name="Panel" type="Panel" parent="."]
anchor_right = 1.0
anchor_bottom = 1.0
margin_right = 40.0
margin_bottom = 40.0
__meta__ = {{
"_edit_use_anchors_": false
}}

[node name="TextPanel" type="RichTextLabel" parent="Panel"]
margin_left = 82.139
margin_top = 734.494
margin_right = 682.139
margin_bottom = 1190.27
custom_fonts/normal_font = ExtResource( 2 )
bbcode_enabled = true
__meta__ = {{
"_edit_use_anchors_": false
}}

[node name="ExitButton" type="Button" parent="Panel"]
margin_left = 123.133
margin_top = 1120.73
margin_right = 219.133
margin_bottom = 1216.73
custom_fonts/font = ExtResource( 4 )
text = "Back"
__meta__ = {{
"_edit_use_anchors_": false
}}

[node name="OKButton" type="Button" parent="Panel"]
margin_left = 542.213
margin_top = 1116.95
margin_right = 638.213
margin_bottom = 1212.95
custom_fonts/font = ExtResource( 4 )
text = "OK"
__meta__ = {{
"_edit_use_anchors_": false
}}

[node name="TextureRect" type="TextureRect" parent="Panel"]
margin_left = 66.5956
margin_top = 78.4877
margin_right = 706.596
margin_bottom = 718.488
texture = ExtResource( 1 )
"""}
    
if __name__ == '__main__':
	main()