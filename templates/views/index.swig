{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="jumbotron">
			<select class="form-control">
				{% for platform in platforms %}
			  	<option value="{{ platform.id }}">{{ platform.name }}</option>
				{% endfor %}
			</select>
		</div>
	</div>
{% endblock %}
