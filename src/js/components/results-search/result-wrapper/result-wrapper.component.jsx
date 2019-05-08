import React, { Component } from "react";
import { ResultItem } from "../result-items/result-item.component";

export class ResultWrapper extends Component {
    
    render() {

        //testdata
        let json = {
            "dataset": [
                {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20130331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [
                            {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "prsn",
                                "_vocabulary_name": "snowfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "rldssi",
                                "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Long Wave over Sea Ice"
                            },
                            {
                                "_name": "rsdssi",
                                "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Shortwave over Sea Ice"
                            },
                            {
                                "_name": "sic",
                                "_vocabulary_name": "sea_ice_area_fraction",
                                "_units": "%",
                                "__text": "Sea Ice Area Fraction"
                            },
                            {
                                "_name": "sim",
                                "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                                "_units": "kg m-2",
                                "__text": "Sea Ice Plus Surface Snow Amount"
                            },
                            {
                                "_name": "sit",
                                "_vocabulary_name": "sea_ice_thickness",
                                "_units": "m",
                                "__text": "Sea Ice Thickness"
                            },
                            {
                                "_name": "snd",
                                "_vocabulary_name": "surface_snow_thickness",
                                "_units": "m",
                                "__text": "Snow Depth"
                            },
                            {
                                "_name": "snomelt",
                                "_vocabulary_name": "surface_snow_melt_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Snow Melt Rate"
                            },
                            {
                                "_name": "strairx",
                                "_vocabulary_name": "surface_downward_x_stress",
                                "_units": "N m-2",
                                "__text": "X-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "strairy",
                                "_vocabulary_name": "surface_downward_y_stress",
                                "_units": "N m-2",
                                "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "tsice",
                                "_vocabulary_name": "surface_temperature",
                                "_units": "K",
                                "__text": "Surface Temperature of Sea Ice"
                            }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [
                        {
                            "serviceName": "HTTPServer",
                            "dataSize": {
                                "_units": "Mbytes",
                                "__text": "19.68"
                            },
                            "dataset_properties":
                            {
                                "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                                "file_version": "1",
                                "size": "19689924",
                                "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                                "mod_time": "2011-12-21 00:18:48",
                                "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                                "checksum_type": "SHA256"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_restrictAccess": "esg-user"
                        },
                        {
                            "serviceName": "gridded",
                            "dataset_properties":
                            {
                                "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                                "time_length": "600",
                                "calendar": "365_day"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "metadata": {
                                "geospatialCoverage": {
                                    "northsouth": {
                                        "start": "-87.863801",
                                        "size": "175.727602",
                                        "units": "degrees_north"
                                    },
                                    "eastwest": {
                                        "start": "0.0",
                                        "size": "357.1875",
                                        "units": "degrees_east"
                                    },
                                    "_zpositive": "up"
                                },
                                "timeCoverage": {
                                    "start": "1850-01-16T12:00:00",
                                    "end": "1899-12-16T12:00:00"
                                },
                                "_inherited": "true"
                            },
                            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_restrictAccess": "esg-user"
                        }
                    ]
                }, {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20140331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [{
                            "_name": "pr",
                            "_vocabulary_name": "rainfall_flux",
                            "_units": "kg m-2 s-1",
                            "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                        },
                        {
                            "_name": "prsn",
                            "_vocabulary_name": "snowfall_flux",
                            "_units": "kg m-2 s-1",
                            "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                        },
                        {
                            "_name": "rldssi",
                            "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                            "_units": "W m-2",
                            "__text": "Downwelling Long Wave over Sea Ice"
                        },
                        {
                            "_name": "rsdssi",
                            "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                            "_units": "W m-2",
                            "__text": "Downwelling Shortwave over Sea Ice"
                        },
                        {
                            "_name": "sic",
                            "_vocabulary_name": "sea_ice_area_fraction",
                            "_units": "%",
                            "__text": "Sea Ice Area Fraction"
                        },
                        {
                            "_name": "sim",
                            "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                            "_units": "kg m-2",
                            "__text": "Sea Ice Plus Surface Snow Amount"
                        },
                        {
                            "_name": "sit",
                            "_vocabulary_name": "sea_ice_thickness",
                            "_units": "m",
                            "__text": "Sea Ice Thickness"
                        },
                        {
                            "_name": "snd",
                            "_vocabulary_name": "surface_snow_thickness",
                            "_units": "m",
                            "__text": "Snow Depth"
                        },
                        {
                            "_name": "snomelt",
                            "_vocabulary_name": "surface_snow_melt_flux",
                            "_units": "kg m-2 s-1",
                            "__text": "Snow Melt Rate"
                        },
                        {
                            "_name": "strairx",
                            "_vocabulary_name": "surface_downward_x_stress",
                            "_units": "N m-2",
                            "__text": "X-Component of Atmospheric Stress On Sea Ice"
                        },
                        {
                            "_name": "strairy",
                            "_vocabulary_name": "surface_downward_y_stress",
                            "_units": "N m-2",
                            "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                        },
                        {
                            "_name": "tsice",
                            "_vocabulary_name": "surface_temperature",
                            "_units": "K",
                            "__text": "Surface Temperature of Sea Ice"
                        }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [{
                        "serviceName": "HTTPServer",
                        "dataSize": {
                            "_units": "Mbytes",
                            "__text": "19.68"
                        },
                        "dataset_properties": {
                            "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "file_version": "1",
                            "size": "19689924",
                            "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                            "mod_time": "2011-12-21 00:18:48",
                            "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                            "checksum_type": "SHA256"
                        },
                        "variables": {
                            "variable": {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            "_vocabulary": "CF-1.0"
                        },
                        "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                        "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                        "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                        "_restrictAccess": "esg-user"
                    },
                    {
                        "serviceName": "gridded",
                        "dataset_properties": {
                            "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "time_length": "600",
                            "calendar": "365_day"
                        },
                        "variables": {
                            "variable": {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            "_vocabulary": "CF-1.0"
                        },
                        "metadata": {
                            "geospatialCoverage": {
                                "northsouth": {
                                    "start": "-87.863801",
                                    "size": "175.727602",
                                    "units": "degrees_north"
                                },
                                "eastwest": {
                                    "start": "0.0",
                                    "size": "357.1875",
                                    "units": "degrees_east"
                                },
                                "_zpositive": "up"
                            },
                            "timeCoverage": {
                                "start": "1850-01-16T12:00:00",
                                "end": "1899-12-16T12:00:00"
                            },
                            "_inherited": "true"
                        },
                        "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                        "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                        "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                        "_restrictAccess": "esg-user"
                    }
                    ]
                }, {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20150331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [
                            {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "prsn",
                                "_vocabulary_name": "snowfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "rldssi",
                                "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Long Wave over Sea Ice"
                            },
                            {
                                "_name": "rsdssi",
                                "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Shortwave over Sea Ice"
                            },
                            {
                                "_name": "sic",
                                "_vocabulary_name": "sea_ice_area_fraction",
                                "_units": "%",
                                "__text": "Sea Ice Area Fraction"
                            },
                            {
                                "_name": "sim",
                                "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                                "_units": "kg m-2",
                                "__text": "Sea Ice Plus Surface Snow Amount"
                            },
                            {
                                "_name": "sit",
                                "_vocabulary_name": "sea_ice_thickness",
                                "_units": "m",
                                "__text": "Sea Ice Thickness"
                            },
                            {
                                "_name": "snd",
                                "_vocabulary_name": "surface_snow_thickness",
                                "_units": "m",
                                "__text": "Snow Depth"
                            },
                            {
                                "_name": "snomelt",
                                "_vocabulary_name": "surface_snow_melt_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Snow Melt Rate"
                            },
                            {
                                "_name": "strairx",
                                "_vocabulary_name": "surface_downward_x_stress",
                                "_units": "N m-2",
                                "__text": "X-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "strairy",
                                "_vocabulary_name": "surface_downward_y_stress",
                                "_units": "N m-2",
                                "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "tsice",
                                "_vocabulary_name": "surface_temperature",
                                "_units": "K",
                                "__text": "Surface Temperature of Sea Ice"
                            }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [
                        {
                            "serviceName": "HTTPServer",
                            "dataSize": {
                                "_units": "Mbytes",
                                "__text": "19.68"
                            },
                            "dataset_properties":
                            {
                                "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                                "file_version": "1",
                                "size": "19689924",
                                "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                                "mod_time": "2011-12-21 00:18:48",
                                "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                                "checksum_type": "SHA256"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_restrictAccess": "esg-user"
                        },
                        {
                            "serviceName": "gridded",
                            "dataset_properties":
                            {
                                "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                                "time_length": "600",
                                "calendar": "365_day"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "metadata": {
                                "geospatialCoverage": {
                                    "northsouth": {
                                        "start": "-87.863801",
                                        "size": "175.727602",
                                        "units": "degrees_north"
                                    },
                                    "eastwest": {
                                        "start": "0.0",
                                        "size": "357.1875",
                                        "units": "degrees_east"
                                    },
                                    "_zpositive": "up"
                                },
                                "timeCoverage": {
                                    "start": "1850-01-16T12:00:00",
                                    "end": "1899-12-16T12:00:00"
                                },
                                "_inherited": "true"
                            },
                            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_restrictAccess": "esg-user"
                        }
                    ]
                },
                {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20160331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [
                            {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "prsn",
                                "_vocabulary_name": "snowfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "rldssi",
                                "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Long Wave over Sea Ice"
                            },
                            {
                                "_name": "rsdssi",
                                "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Shortwave over Sea Ice"
                            },
                            {
                                "_name": "sic",
                                "_vocabulary_name": "sea_ice_area_fraction",
                                "_units": "%",
                                "__text": "Sea Ice Area Fraction"
                            },
                            {
                                "_name": "sim",
                                "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                                "_units": "kg m-2",
                                "__text": "Sea Ice Plus Surface Snow Amount"
                            },
                            {
                                "_name": "sit",
                                "_vocabulary_name": "sea_ice_thickness",
                                "_units": "m",
                                "__text": "Sea Ice Thickness"
                            },
                            {
                                "_name": "snd",
                                "_vocabulary_name": "surface_snow_thickness",
                                "_units": "m",
                                "__text": "Snow Depth"
                            },
                            {
                                "_name": "snomelt",
                                "_vocabulary_name": "surface_snow_melt_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Snow Melt Rate"
                            },
                            {
                                "_name": "strairx",
                                "_vocabulary_name": "surface_downward_x_stress",
                                "_units": "N m-2",
                                "__text": "X-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "strairy",
                                "_vocabulary_name": "surface_downward_y_stress",
                                "_units": "N m-2",
                                "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "tsice",
                                "_vocabulary_name": "surface_temperature",
                                "_units": "K",
                                "__text": "Surface Temperature of Sea Ice"
                            }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [
                        {
                            "serviceName": "HTTPServer",
                            "dataSize": {
                                "_units": "Mbytes",
                                "__text": "19.68"
                            },
                            "dataset_properties":
                            {
                                "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                                "file_version": "1",
                                "size": "19689924",
                                "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                                "mod_time": "2011-12-21 00:18:48",
                                "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                                "checksum_type": "SHA256"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_restrictAccess": "esg-user"
                        },
                        {
                            "serviceName": "gridded",
                            "dataset_properties":
                            {
                                "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                                "time_length": "600",
                                "calendar": "365_day"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "metadata": {
                                "geospatialCoverage": {
                                    "northsouth": {
                                        "start": "-87.863801",
                                        "size": "175.727602",
                                        "units": "degrees_north"
                                    },
                                    "eastwest": {
                                        "start": "0.0",
                                        "size": "357.1875",
                                        "units": "degrees_east"
                                    },
                                    "_zpositive": "up"
                                },
                                "timeCoverage": {
                                    "start": "1850-01-16T12:00:00",
                                    "end": "1899-12-16T12:00:00"
                                },
                                "_inherited": "true"
                            },
                            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_restrictAccess": "esg-user"
                        }
                    ]
                },
                {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20170331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [
                            {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "prsn",
                                "_vocabulary_name": "snowfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "rldssi",
                                "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Long Wave over Sea Ice"
                            },
                            {
                                "_name": "rsdssi",
                                "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Shortwave over Sea Ice"
                            },
                            {
                                "_name": "sic",
                                "_vocabulary_name": "sea_ice_area_fraction",
                                "_units": "%",
                                "__text": "Sea Ice Area Fraction"
                            },
                            {
                                "_name": "sim",
                                "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                                "_units": "kg m-2",
                                "__text": "Sea Ice Plus Surface Snow Amount"
                            },
                            {
                                "_name": "sit",
                                "_vocabulary_name": "sea_ice_thickness",
                                "_units": "m",
                                "__text": "Sea Ice Thickness"
                            },
                            {
                                "_name": "snd",
                                "_vocabulary_name": "surface_snow_thickness",
                                "_units": "m",
                                "__text": "Snow Depth"
                            },
                            {
                                "_name": "snomelt",
                                "_vocabulary_name": "surface_snow_melt_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Snow Melt Rate"
                            },
                            {
                                "_name": "strairx",
                                "_vocabulary_name": "surface_downward_x_stress",
                                "_units": "N m-2",
                                "__text": "X-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "strairy",
                                "_vocabulary_name": "surface_downward_y_stress",
                                "_units": "N m-2",
                                "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "tsice",
                                "_vocabulary_name": "surface_temperature",
                                "_units": "K",
                                "__text": "Surface Temperature of Sea Ice"
                            }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [
                        {
                            "serviceName": "HTTPServer",
                            "dataSize": {
                                "_units": "Mbytes",
                                "__text": "19.68"
                            },
                            "dataset_properties":
                            {
                                "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                                "file_version": "1",
                                "size": "19689924",
                                "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                                "mod_time": "2011-12-21 00:18:48",
                                "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                                "checksum_type": "SHA256"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_restrictAccess": "esg-user"
                        },
                        {
                            "serviceName": "gridded",
                            "dataset_properties":
                            {
                                "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                                "time_length": "600",
                                "calendar": "365_day"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "metadata": {
                                "geospatialCoverage": {
                                    "northsouth": {
                                        "start": "-87.863801",
                                        "size": "175.727602",
                                        "units": "degrees_north"
                                    },
                                    "eastwest": {
                                        "start": "0.0",
                                        "size": "357.1875",
                                        "units": "degrees_east"
                                    },
                                    "_zpositive": "up"
                                },
                                "timeCoverage": {
                                    "start": "1850-01-16T12:00:00",
                                    "end": "1899-12-16T12:00:00"
                                },
                                "_inherited": "true"
                            },
                            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_restrictAccess": "esg-user"
                        }
                    ]
                },
                {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20180331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [
                            {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "prsn",
                                "_vocabulary_name": "snowfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "rldssi",
                                "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Long Wave over Sea Ice"
                            },
                            {
                                "_name": "rsdssi",
                                "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Shortwave over Sea Ice"
                            },
                            {
                                "_name": "sic",
                                "_vocabulary_name": "sea_ice_area_fraction",
                                "_units": "%",
                                "__text": "Sea Ice Area Fraction"
                            },
                            {
                                "_name": "sim",
                                "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                                "_units": "kg m-2",
                                "__text": "Sea Ice Plus Surface Snow Amount"
                            },
                            {
                                "_name": "sit",
                                "_vocabulary_name": "sea_ice_thickness",
                                "_units": "m",
                                "__text": "Sea Ice Thickness"
                            },
                            {
                                "_name": "snd",
                                "_vocabulary_name": "surface_snow_thickness",
                                "_units": "m",
                                "__text": "Snow Depth"
                            },
                            {
                                "_name": "snomelt",
                                "_vocabulary_name": "surface_snow_melt_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Snow Melt Rate"
                            },
                            {
                                "_name": "strairx",
                                "_vocabulary_name": "surface_downward_x_stress",
                                "_units": "N m-2",
                                "__text": "X-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "strairy",
                                "_vocabulary_name": "surface_downward_y_stress",
                                "_units": "N m-2",
                                "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "tsice",
                                "_vocabulary_name": "surface_temperature",
                                "_units": "K",
                                "__text": "Surface Temperature of Sea Ice"
                            }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [
                        {
                            "serviceName": "HTTPServer",
                            "dataSize": {
                                "_units": "Mbytes",
                                "__text": "19.68"
                            },
                            "dataset_properties":
                            {
                                "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                                "file_version": "1",
                                "size": "19689924",
                                "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                                "mod_time": "2011-12-21 00:18:48",
                                "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                                "checksum_type": "SHA256"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_restrictAccess": "esg-user"
                        },
                        {
                            "serviceName": "gridded",
                            "dataset_properties":
                            {
                                "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                                "time_length": "600",
                                "calendar": "365_day"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "metadata": {
                                "geospatialCoverage": {
                                    "northsouth": {
                                        "start": "-87.863801",
                                        "size": "175.727602",
                                        "units": "degrees_north"
                                    },
                                    "eastwest": {
                                        "start": "0.0",
                                        "size": "357.1875",
                                        "units": "degrees_east"
                                    },
                                    "_zpositive": "up"
                                },
                                "timeCoverage": {
                                    "start": "1850-01-16T12:00:00",
                                    "end": "1899-12-16T12:00:00"
                                },
                                "_inherited": "true"
                            },
                            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_restrictAccess": "esg-user"
                        }
                    ]
                },
                {
                    "metadata": {
                        "dataType": "Grid",
                        "dataFormat": "NetCDF",
                        "_inherited": "true"
                    },
                    "properties": {
                        "dataset_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1",
                        "dataset_version": "20190331",
                        "dataset_id_template_": "cmip5.%(product)s.%(institute)s.%(model)s.%(experiment)s.%(time_frequency)s.%(realm)s.%(ensemble)s",
                        "directory_format_template_": "%(root)s/%(project)s/%(product)s/%(institute)s/%(model)s/%(experiment)s/%(time_frequency)s/%(realm)s/%(variable)s/%(ensemble)s",
                        "project": "cmip5",
                        "experiment": "sstClimSulfate",
                        "product": "output",
                        "model": "CanESM2",
                        "time_frequency": "mon",
                        "realm": "seaIce",
                        "cmor_table": "OImon",
                        "ensemble": "r1i1p1",
                        "institute": "CCCma",
                        "forcing": "SA",
                        "title": "CanESM2 model output prepared for CMIP5 sulfate aerosol forcing",
                        "creation_time": "2019-03-14 16:36:15",
                        "format": "netCDF, CF-1.4",
                        "drs_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.OImon.r1i1p1"
                    },
                    "variables": {
                        "variable": [
                            {
                                "_name": "pr",
                                "_vocabulary_name": "rainfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "prsn",
                                "_vocabulary_name": "snowfall_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Surface Snowfall Rate into the Sea Ice Portion of the Grid Cell"
                            },
                            {
                                "_name": "rldssi",
                                "_vocabulary_name": "surface_downwelling_longwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Long Wave over Sea Ice"
                            },
                            {
                                "_name": "rsdssi",
                                "_vocabulary_name": "surface_downwelling_shortwave_flux_in_air",
                                "_units": "W m-2",
                                "__text": "Downwelling Shortwave over Sea Ice"
                            },
                            {
                                "_name": "sic",
                                "_vocabulary_name": "sea_ice_area_fraction",
                                "_units": "%",
                                "__text": "Sea Ice Area Fraction"
                            },
                            {
                                "_name": "sim",
                                "_vocabulary_name": "sea_ice_and_surface_snow_amount",
                                "_units": "kg m-2",
                                "__text": "Sea Ice Plus Surface Snow Amount"
                            },
                            {
                                "_name": "sit",
                                "_vocabulary_name": "sea_ice_thickness",
                                "_units": "m",
                                "__text": "Sea Ice Thickness"
                            },
                            {
                                "_name": "snd",
                                "_vocabulary_name": "surface_snow_thickness",
                                "_units": "m",
                                "__text": "Snow Depth"
                            },
                            {
                                "_name": "snomelt",
                                "_vocabulary_name": "surface_snow_melt_flux",
                                "_units": "kg m-2 s-1",
                                "__text": "Snow Melt Rate"
                            },
                            {
                                "_name": "strairx",
                                "_vocabulary_name": "surface_downward_x_stress",
                                "_units": "N m-2",
                                "__text": "X-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "strairy",
                                "_vocabulary_name": "surface_downward_y_stress",
                                "_units": "N m-2",
                                "__text": "Y-Component of Atmospheric Stress On Sea Ice"
                            },
                            {
                                "_name": "tsice",
                                "_vocabulary_name": "surface_temperature",
                                "_units": "K",
                                "__text": "Surface Temperature of Sea Ice"
                            }
                        ],
                        "_vocabulary": "CF-1.0"
                    },
                    "dataset_list": [
                        {
                            "serviceName": "HTTPServer",
                            "dataSize": {
                                "_units": "Mbytes",
                                "__text": "19.68"
                            },
                            "dataset_properties":
                            {
                                "file_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                                "file_version": "1",
                                "size": "19689924",
                                "tracking_id": "2e4785d1-8c1e-4cc9-bb3a-3a50f06bc4ad",
                                "mod_time": "2011-12-21 00:18:48",
                                "checksum": "01655795e4276074e3f07dd29b13d2335aa7175d532a3fb0df6d12289dfb2732",
                                "checksum_type": "SHA256"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "_name": "pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331.pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_urlPath": "esg_dataroot/AR5/CMIP5/output/CCCma/CanESM2/sstClimSulfate/mon/seaIce/pr/r1i1p1/pr_OImon_CanESM2_sstClimSulfate_r1i1p1_185001-189912.nc",
                            "_restrictAccess": "esg-user"
                        },
                        {
                            "serviceName": "gridded",
                            "dataset_properties":
                            {
                                "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                                "time_length": "600",
                                "calendar": "365_day"
                            },
                            "variables": {
                                "variable": {
                                    "_name": "pr",
                                    "_vocabulary_name": "rainfall_flux",
                                    "_units": "kg m-2 s-1",
                                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                                },
                                "_vocabulary": "CF-1.0"
                            },
                            "metadata": {
                                "geospatialCoverage": {
                                    "northsouth": {
                                        "start": "-87.863801",
                                        "size": "175.727602",
                                        "units": "degrees_north"
                                    },
                                    "eastwest": {
                                        "start": "0.0",
                                        "size": "357.1875",
                                        "units": "degrees_east"
                                    },
                                    "_zpositive": "up"
                                },
                                "timeCoverage": {
                                    "start": "1850-01-16T12:00:00",
                                    "end": "1899-12-16T12:00:00"
                                },
                                "_inherited": "true"
                            },
                            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                            "_restrictAccess": "esg-user"
                        }
                    ]
                }
            ]
        }
        
        let createTableRow = (json) => {
            return (
                <ResultItem 
                    json={json}/>
            );
        };

        return (
            <div className="result-wrapper">
                <div className="result-header">
                    Results
                </div>
                {json.dataset.map(createTableRow)}
            </div>
        )
    }
}
